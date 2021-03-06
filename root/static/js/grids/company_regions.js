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
    
    var CompanyRegion = Ext.data.Record.create([
        { name: 'company_region_id', type: 'int' },
        { name: 'description',       type: 'string' },
    ]);

    var store = new Ext.data.JsonStore({
        url:        url_company_region_list,
        root:       'objects',
        fields:     CompanyRegion
    });
    
    var content_cols = [
        { id:         'description',
          header:     'Description',
          dataIndex:  'description',
          width:      150,
          editor:     new Ext.form.TextField({
              allowBlank:     true,
          })},
    ];

    function viewLink (grid, record, action, row, col) {
        var t = new Ext.XTemplate(url_base + 'companyregion/view/{company_region_id}');
        window.location=t.apply({company_region_id: record.get('company_region_id')});
    };

    function recordChanges (record) {
        var fields = record.getChanges();
        fields.company_region_id = record.get( 'company_region_id' );
        return(fields);
    }

    var panel = new MyMainPanel({
        title: 'All Company Regions',
        layout: 'fit',
        items: new MyEditorGrid(
            {
                objLabel:           'Company Region',
                idField:            'company_region_id',
                autoExpandColumn:   'description',
                store:              store,
                contentCols:        content_cols,
                viewLink:           viewLink,
                deleteUrl:          url_company_region_delete,
                submitUrl:          url_company_region_submit,
                recordChanges:      recordChanges,
            }
        ),
        tbar:
        [
            { text: 'Home',
              handler: function() { window.location = url_base; } },
        ],
    });
    
    var view = new Ext.Viewport({
        layout: 'fit',
        items:  panel,
    });

    //  FIXME we also need to warn the user if they're trying to
    //  navigate away from a dirty grid.
    
});

