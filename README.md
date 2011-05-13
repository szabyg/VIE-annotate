VIE annotate widget
===================

VIE and VIE² based annotation widget collection.

Usage
-----

When the necessary widgets implemented this is the code needed for activating the 
annotation widget. Later this could be compiled into one widget.

    $(document).ready(function() {
        // Make an element editable using the VIE.editable widget. 
        // Whenever a smartContentChange happens..
        $('#content').editable().bind('editablechanged', function(editedInfo){
            // .. analyze the content using VIE2.
            $(editedInfo.element).vie2('analyze')
            // for each enhancement found by VIE2, 
            .bind('enhancementFound', function(enhancementDetails){
                // get create a dom element containing only the occurrance of the found entity
                // (getOrCreateDomElement is to be implemented)
                var foundEntityDomEl = $(this).getOrCreateDomElement( 
                    enhancementDetails.occurranceText, {
                        // create only if it doesn't have it's element already
                        createMode: 'existing', 
                        createElement: 'span', 
                        // only the first occurrence
                        mode: 'first', 
                        styleClass: 'enhancementFound'
                    }
                );
                // Apply annotation widget
                // This makes the occurrence clickable
                // On clicking on the word a pop-over shows the found enhancements
                // and the buttons Accept, Decline, [More]
                // on Accept the element gets RDFa annotated plus specific event
                // on Decline the marker gets removed plus specific event
                $(foundEntityDomEl).annotate({
                    enhancement: enhancementDetails,
                });
            });
        });
        
    });


