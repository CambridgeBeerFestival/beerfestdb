/*
 * This file is part of BeerFestDB, a beer festival product management
 * system.
 * 
 * Copyright (C) 2010 Tim F. Rayner
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * $Id$
 */

Ext.onReady(function(){

    // Enable tooltips
    Ext.QuickTips.init();
    
    var Festival = Ext.data.Record.create([
        { name: 'festival_id', type: 'int',    allowBlank: false },
        { name: 'year',        type: 'int' ,   allowBlank: false },
        { name: 'name',        type: 'string', allowBlank: false },
        { name: 'description', type: 'string' },
        { name: 'fst_start_date',  type: 'date', dateFormat: 'Y-m-d' },
        { name: 'fst_end_date',    type: 'date', dateFormat: 'Y-m-d' },
    ]);

    var store = new Ext.data.JsonStore({
        url:        url_festival_list,
        root:       'objects',
        fields:     Festival
    });

    var content_cols = [
        { id:         'year',
          header:     'Year',
          dataIndex:  'year',
          width:      30,
          // FIXME make this a drop-down or something.
          editor:     new Ext.form.NumberField({
              allowBlank:     false,
              allowDecimals:  false,
              maxLength:      4,
              minLength:      4,
          })},
        { id:         'name',
          header:     'Name',
          dataIndex:  'name',
          width:      150,
          editor:     new Ext.form.TextField({
              allowBlank:     false,
          })},
        { id:         'description',
          header:     'Description',
          dataIndex:  'description',
          width:      150,
          editor:     new Ext.form.TextField({
              allowBlank:     true,
          })},
        { id:         'fst_start_date',
          header:     'Start date',
          dataIndex:  'fst_start_date',
          width:      100,
          editor:     new Ext.form.DateField({
              allowBlank:     true,
          }),
          renderer:   Ext.util.Format.dateRenderer('Y-m-d'),},
        { id:         'fst_end_date',
          header:     'End date',
          dataIndex:  'fst_end_date',
          width:      100,
          editor:     new Ext.form.DateField({
              allowBlank:     true,
          }),
          renderer:   Ext.util.Format.dateRenderer('Y-m-d'),},
    ];

    function viewLink (grid, record, action, row, col) {
        var t = new Ext.XTemplate( url_base + 'festival/view/{festival_id}');
        window.location=t.apply({festival_id: record.get('festival_id')});
    };

    function recordChanges (record) {
        var fields = record.getChanges();
        fields.festival_id = record.get( 'festival_id' );
        return(fields);
    }

    var panel = new MyMainPanel({
        title: 'Festival listing',
        layout: 'fit',
        items: new MyEditorGrid(
            {
                objLabel:           'Festival',
                idField:            'festival_id',
                autoExpandColumn:   'name',
                store:              store,
                contentCols:        content_cols,
                viewLink:           viewLink,
                deleteUrl:          url_festival_delete,
                submitUrl:          url_festival_submit,
                recordChanges:      recordChanges,
            }
        ),
        tbar:
        [
            { text: 'Home', handler: function() { window.location = url_base; } },
        ],
    });
    
    var view = new Ext.Viewport({
        layout: 'fit',
        items:  panel,
    });

    //  FIXME we also need to warn the user if they're trying to
    //  navigate away from a dirty grid.
    
});

