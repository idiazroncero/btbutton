(function ($) {

  var btbuttonHelper = {
    classes : {
      types: [
        'btn-link',
        'btn-primary',
        'btn-outline-primary',
        'btn-secondary',
        'btn-outline-secondary',
        'btn-success',
        'btn-outline-success',
        'btn-info',
        'btn-outline-info',
        'btn-warning',
        'btn-outline-warning',
        'btn-danger',
        'btn-outine-danger',
        'btn-light',
        'btn-outline-light',
        'btn-dark',
        'btn-outline-dark',
      ],
      sizes: [
        'btn-sm',
        'btn-lg'
      ],
    },

    getClassesAsString: function(){
      return this.classes.types.join(' ') + ' ' + this.classes.sizes.join(' ');
    },

    detectButtonType : function($el){
      var classes = this.classes.types;
      return this.findFirstMatchInClasses(classes, $el);
    },

    detectButtonSize : function($el){
      var sizes = this.classes.sizes;
      return this.findFirstMatchInClasses(sizes, $el);
    },

    detectIconName: function($el) {
      var $icon = $('.btbutton-icon', $el);
      if ($icon.length === 0) {
        return false;
      }

      var class_array = $icon.attr('class').split(' ');
      var result;

      // Extend this array if you need to support more libraries than
      // font awesome and/or other utility classes.
      var exclude_classes = [
        'btbutton-icon',
        'fa'
      ];

      // Find the class excluding all utility extra classes.
      class_array.forEach(function(class_name){
        if (!exclude_classes.includes(class_name)) {
          result = class_name;
        }
      })

      return result;
    },

    detectIconPlacement: function($el) {
      var $icon = $('.btbutton-icon', $el);
      if ($icon.length === 0) {
        return false;
      }

      var position = $el.index($icon);

      if (position === 0) {
        return 'left'
      } else {
        return 'right';
      }
    },

    findFirstMatchInClasses: function(items, $el) {
      for(var i = 0; i < items.length; i++) {
        if ($el.hasClass(items[i])) {
          return items[i];
        }
      }
    },

    applyButtonType: function($el, type) {
      $el.removeClass(this.classes.types).addClass(type);
    },

    applyButtonSize: function($el, size) {
      $el.removeClass(this.classes.sizes).addClass(size);
    },

    applyIcon: function($el, icon_name, position) {
      $('.btbutton-icon', $el).remove();
      if (icon_name) {
        // Non-breaking spaces are needed in order to avoid CKEditor from
        // removing the whole HTML element.
        var html = $('<span class="btbutton-icon">&nbsp;</span>\n');
        html.addClass(this.processIconClasses(icon_name));

        if (position === 'left') {
          $el.prepend(html);
        } else {
          $el.append(html);
        }
      }
    },

    processIconClasses: function(icon_name) {
      var classes = [];

      // Remve the dot, in case any user introduced it.
      classes.push(icon_name.replace(/^\./, ''));

      // Detect fontawesome
      if (/^fa-/i.test(icon_name)) {
        classes.push('fa');
      }

      return classes;
    }
  }

  CKEDITOR.plugins.add('btbutton', {
    lang: 'en,ru,pt-br,uk',
    requires: 'widget,dialog',
    icons: 'btbutton',
    init: function (editor) {
      var lang = editor.lang.btbutton;
      CKEDITOR.dialog.add('btbutton', this.path + 'dialogs/btbutton.js');

      // Add widget
      editor.ui.addButton('btbutton', {
        label: lang.buttonTitle,
        command: 'btbutton',
        icon: this.path + 'icons/btbutton.png'
      });

      editor.widgets.add('btbutton', {

        // Allow elements, attributes and classes needed.
        allowedContent: 'a(*);a[href,target];span(*)',
        dialog: 'btbutton',

        init: function () {
          var $el = $(this.element.$);
          this.data.btntype = btbuttonHelper.detectButtonType($el);
          this.data.btnsize = btbuttonHelper.detectButtonSize($el)
          this.data.href = $el.attr('href');
          this.data.target = $el.attr('target');
          this.data.text = $('.text', $el).text();
          this.data.iconname = btbuttonHelper.detectIconName($el);
          this.data.iconplacement = btbuttonHelper.detectIconPlacement($el);
        },

        template: '<a class="btn"><span class="btbutton-icon"></span><span class="text"></span><span class="btbutton-icon"></span></a>',

        data: function () {
          var $el = $(this.element.$);

          btbuttonHelper.applyButtonType($el, this.data.btntype);
          btbuttonHelper.applyButtonSize($el, this.data.btnsize);
          btbuttonHelper.applyIcon($el, this.data.iconname, this.data.iconplacement);

          if (this.data.href) {
            $el.attr('href', this.data.href);
            this.element.$.removeAttribute('data-cke-saved-href');
          }

          if (this.data.target && this.data.target != '') {
            $el.attr('target', this.data.target);
          }

          if (this.data.text) {
            $('.text', $el).text(this.data.text);
          }
        },

        requiredContent: 'a(btn)',

        upcast: function (element) {
          return element.name == 'a' && element.hasClass('btn');
        }
      });
    }
  });
})(jQuery);
