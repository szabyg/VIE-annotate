(function(jQuery) {
    jQuery.widget('VIE2.annotate', {
        options: {
            store: VIE2.globalCache,
            text: ''
        },
    
        _create: function() {
            if(!this.options.text)this.options.text = this.element.textContent;
            var that = this;
            var entities = this.options.store
            .where('?entity <http://fise.iks-project.eu/ontology/selected-text> ?occ')
            .where('?entity fise:hasEntityAnnotation ?annotation')
            .filter('occ', this.options.text);
            if(entities.length){
                _(entities).each(function(entityResult){
                    console.info(['entity for ' + entityResult.occ, entityResult.entity.toString()])
                    that.element.attr('about', entityResult.entity.toString());
                })
            } else {
                console.info('No entity for ' + this.options.text);
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
            $(newDiv).dialog({show:'fade', hide: 'explode'});
/*
            newDiv.position({
                of: this.element,
                my: 'center center',
                at: 'center center'
            });
*/
        },
        enable: function() {      
        },
        
        disable: function() {
        },
        
    });
})(jQuery);
