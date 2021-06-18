CKEDITOR.dialog.add('btbutton', function (editor) {
    var lang = editor.lang.btbutton;

    return {
      title: 'Button Link',
      minWidth: 500,
      minHeight: 150,
      resizable: false,
      contents: [{
          id: 'info',
          label: lang.tabInfo,
          accessKey: 'I',
          elements: [{
              type: "hbox",
              widths: ["50%", "50%"],
              children: [{
                  id: 'btntype',
                  type: 'select',
                  required: true,
                  label: lang.buttonStyleLabel,
                  default: 'btn-primary',
                  items: [
                    [lang.buttonLink, ''],
                    [lang.buttonPrimary, 'btn-primary'],
                    [lang.buttonOutlinePrimary, 'btn-outline-primary'],
                    [lang.buttonSecondary, 'btn-secondary'],
                    [lang.buttonOutlineSecondary, 'btn-outline-secondary'],
                    [lang.buttonSuccess, 'btn-success'],
                    [lang.buttonOutlineSuccess, 'btn-outline-success'],
                    [lang.buttonInfo, 'btn-info'],
                    [lang.buttonOutlineInfo, 'btn-outline-info'],
                    [lang.buttonWarning, 'btn-warning'],
                    [lang.buttonOutlineWarning, 'btn-outline-warning'],
                    [lang.buttonDanger, 'btn-danger'],
                    [lang.buttonOutlineDanger, 'btn-outine-danger'],
                    [lang.buttonLight, 'btn-light'],
                    [lang.buttonOutlineLight, 'btn-outline-light'],
                    [lang.buttonDark, 'btn-dark'],
                    [lang.buttonOutlineDark, 'btn-outline-dark']
                  ],
                  setup: function (widget) {
                    this.setValue(widget.data.btntype || '');
                  },
                  commit: function (widget) {
                    var value = this.getValue() === "" ? 'btn-link' : this.getValue();
                    widget.setData('btntype', value);
                  }
                },
                {
                  id: 'btnsize',
                  type: 'select',
                  required: true,
                  label: lang.buttonSizeLabel,
                  'default': 'btn-sm',
                  items: [
                    [lang.buttonSizeSmall, 'btn-sm'],
                    [lang.buttonSizeNormal, ''],
                    [lang.buttonSizeLarge, 'btn-lg']
                  ],
                  setup: function (widget) {
                    this.setValue(widget.data.btnsize || '');
                  },
                  commit: function (widget) {
                    widget.setData('btnsize', this.getValue());
                  }
                }
              ]
            },
            {
              type: "hbox",
              widths: ["50%", "50%"],
              children: [{
                  id: 'text',
                  type: 'text',
                  width: '200px',
                  required: true,
                  label: lang.buttonTextLabel,
                  setup: function (widget) {
                    this.setValue(widget.data.text || 'A Button');
                  },
                  commit: function (widget) {
                    widget.setData('text', this.getValue());
                  }
                },
                {
                  id: 'href',
                  type: 'text',
                  width: '200px',
                  required: true,
                  label: lang.buttonUrlLabel,
                  setup: function (widget) {
                    this.setValue(widget.data.href || '#');
                  },
                  commit: function (widget) {
                    widget.setData('href', this.getValue());
                  }
                }
              ]
            }
          ]
        },
        {
          id: 'target',
          label: lang.tabTarget,
          elements: [{
            id: "target",
            type: "select",
            label: lang.buttonTargetLabel,
            items: [
              ['Not Set', ''],
              ['Frame', "frame"],
              ['Popup', "popup"],
              ['New Window (_blank)', "_blank"],
              ['Topmost Window (_top)', "_top"],
              ['Same Window (_self)', "_self"],
              ['Parent Window (_parent)', "_parent"]
            ],
            setup: function (widget) {
              this.setValue(widget.data.target || '');
            },
            commit: function (widget) {
              widget.setData('target', this.getValue());
            }
          }]
        },
        {
          id: 'icons',
          label: lang.tabIcons,
          elements: [{
            type: "hbox",
            widths: ["50%", "50%"],
            children: [{
              type: 'vbox',
              children: [{
                  type: 'html',
                  html: '<p>Indicate your icon names and your placement preference</p>' +
                    '<p>e.g. <code>my-icon-arrow-right</code>, <code>fa-chevron-down</code></p>' +
                    '<p>You don\'t need to add the starting dot or, if using FontAwesome, the .fa class</p>'
                },
                {
                  id: 'iconname',
                  type: 'text',
                  width: '150px',
                  label: 'Icon name',
                  setup: function (widget) {
                    this.setValue(widget.data.iconname || '');
                  },
                  commit: function (widget) {
                    widget.setData('iconname', this.getValue());
                  }
                },
                {
                  id: 'iconplacement',
                  label: 'Icon placement',
                  type: "select",
                  items: [
                    ['Left', 'left'],
                    ['Right', '']
                  ],
                  setup: function (widget) {
                    this.setValue(widget.data.iconplacement || '');
                  },
                  commit: function (widget) {
                    widget.setData('iconplacement', this.getValue());
                  }
                },
              ]
            }]
          }]
        }
      ]
    };
  });
