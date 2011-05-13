(function(jQuery) {
    jQuery.widget('VIE2.annotate', {
        options: {
            // rdfQuery object
            store: VIE2.globalCache,
            // acceptStrategy can be a string identifying a strategy like 
            // 'unique': Automatically accept if there's only one enhancement, default
            // 'none': No enhancement gets accepted automatically
            // callback function: implement your own strategy
            acceptStrategy: 'unique',
            text: '',
        },
    
        _create: function() {
            if(!this.options.text)this.options.text = this.element.textContent;
            var that = this;
            var entities = this.options.store
            .where('?entity fise:selected-text ?occ')
            .where('?enh fise:confidence ?conf')
            .where('?entity fise:hasEntityAnnotation ?enh')
            .filter('occ', this.options.text);
            entities = _(entities).sortBy(function(ent){ent.conf.value});
            console.log('store entities found', entities);
            if(entities.length){
                var entityResult = entities[0];
                
                // var curie = $.createCurie(entityResult.entity.value, {namespaces: VIE2.namespaces});
                console.info(['entity for ' + entityResult.occ, entityResult.entity.toString()])
                that.element.attr('about', entityResult.entity.value);
                // that.element.attr("property", 'dbpedia:foo')
                var fromVIE = VIE.RDFaEntities.getInstance(that.element);
                console.log("VIE finds", fromVIE);
            } else {
                console.info("No entity for '" + this.options.text + "'");
            }
            this.element.bind('click', function(){
                that.showDialog();
            })
        },
        
        _init: function() {
            if (this.options.disabled) {
                this.disable();
                return;
            }
            this.enable();
        },
        
        showDialog: function(){
            var newDiv = $(document.createElement('div')); 
            newDiv.attr('title', this.options.text);
            $('body').append(newDiv);
            $(newDiv).html('to be templated...');
            $(newDiv).dialog({show:'fade', hide: 'fade'});
/*
            newDiv.position({
                of: this.element,
                my: 'center center',
                at: 'center center'
            });
*/
        },
        acceptAnnotation: function(domEl, enhancement){
            $(domEl).addClass('confirmedAnnotation');
        },
        declineAnnotation: function(domEl, enhancement){
            $(domEl).removeClass('confirmedAnnotation');
            this.options.blacklist[domEl.textValue] = enhancement.uri;
        },
        enable: function() {      
        },
        
        disable: function() {
        },
        
    });
})(jQuery);
