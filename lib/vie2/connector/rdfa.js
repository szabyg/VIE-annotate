// File:   rdfa.js
// Author: <a href="mailto:sebastian.germesin@dfki.de">Sebastian Germesin</a>
//

new VIE2.Connector('rdfa');

VIE2.connectors['rdfa'].analyze = function (object, options) {
    var rdf = jQuery.rdf({namespaces: VIE2.namespaces});
    
    if (object === undefined) {
        VIE2.log ("warn", "VIE2.Connector('" + this.id + "')#analyze()", "Given object is undefined!");
        callback(rdf);
    } else if (typeof object === 'object') {
        var self = this;
        //does only work on objects that have the 'typeof' attribute set!
        if (object.attr('typeof')) {
            //use rdfQuery to analyze the object
            //RDF.add() is broken -> workaround!
            jQuery(object).rdf().databank.triples().each(function () {
                rdf.add(this);
            });
            
            if (options && options.success) {
                options.success.call(self, rdf);
            } else {
                VIE2.log("warn", "VIE2.Connector(" + self.id + ")", "No success callback given. How do you think this should gonna work?'");
            }
            
        } else {
            VIE2.log("info", "VIE2.Connector(" + this.id + ")#analyze()", "Object has no 'typeof' attribute! Trying to find children.");
            
            object.find('[typeof]').each(function(i, e) {
                var rdfa = jQuery(e).rdf();
                
                //RDF.add() is broken -> workaround!
                jQuery.each(rdfa.databank.triples(), function () {
                    rdf.add(this);
                });
            });
            if (options && options.success) {
                options.success.call(self, rdf);
            } else {
                VIE2.log("warn", "VIE2.Connector(" + self.id + ")", "No success callback given. How do you think this should gonna work?'");
            }
        }
    } else {
        VIE2.log("error", "VIE2.Connector(" + this.id + ")#analyze()", "Expected object, found: '" + (typeof object) + "'");
        if (options && options.error) {
            options.error.call(this, "Expected element of type 'object', found: '" + (typeof object) + "'");
        }
    }
};
/*
VIE2.connectors['rdfa'].annotate = function (elem, triple, namespaces, callback) {
    VIE2.log("info", "VIE2.Connector(" + this.id + ")#annotate()", "Start annotation of object with triple.");
    jQuery(elem).rdfa(triple);
    
};*/
