﻿/**
 * Authored by Amaya
 */
Ext.define('EasyTreatyApp.controller.DetailsView', {
    extend: 'Ext.app.Controller',
   // requires:'Ext.data.JsonP',

    config: {
        refs: {
            detailsView: 'detailsview',
            mapView: 'mapview',
            userProfile: 'userprofile',
            listView:'listview'
        },
        control: {
            detailsView: {
                back: "backToMapView",
                comment: "comment",
                like: "like",
                togglefavorite: "onFavoriteToggle"
            },
            userProfile: {
                back: "backToMapView"
            }

        }
    },
    onFavoriteToggle: function (recordId, isFavorite) {
        console.log("is favorite");
        console.log(isFavorite);
        var store = Ext.data.StoreManager.lookup('fav-store');

        var record = this.getMapView().getStore().getById(recordId);

        var string;

        if (isFavorite) {
            record.set('isFavorite', true);

            string = Ext.JSON.encode(record.getData());
            store.storeTokenInLocalStorage(string);
            EasyTreatyApp.config.getFavorites().push(record.getData());
        }
        else {

            string = Ext.JSON.encode(record.getData());
            store.removeTokenFromLocalStorage(string);
            record.set('isFavorite', false);
            var newFav = Ext.Array.filter(EasyTreatyApp.config.getFavorites(), function (item) {
                if (item.reference != record.get('reference')) {
                    return true;
                };
            });
            EasyTreatyApp.config.setFavorites(newFav);

        }

        this.getListView().fillList();
    },



    //like: function (data) {
    like: function (like,detailsView) {
        console.log("inside like");

        this.getMapView().getStore().like(like, detailsView.getData().id, null, detailsView);       
    },

    comment: function (commentField, detailsView) {
        console.log("inside comment");
        var me = this;
        var comment = commentField.getValue();

        if (comment.replace(/\s/g, '').length) {
            Ext.Ajax.request({
                // Ext.data.JsonP.request({
                // url: 'http://192.168.122.1:8888/comment',
                url:EasyTreatyApp.config.getRatingServerDomain()+'comment',
                method: 'GET',
                params: {
                    location: detailsView.getData().id,
                    user: EasyTreatyApp.config.getUser().get('personUuid'),
                    comment: commentField.getValue()
                },
                success: function (response, opts) {
                    console.log("success");
                    console.log(response.responseText);
                    commentField.setValue("");
                    detailsView.reloadCommentStore();
                },
                failure: function (response, opts) {
                    console.log("failure");
                    console.log(response);
                }
            });
        } 
        
    },  
    
    backToMapView: function () {
            var mapview = this.getMapView();
            Ext.Viewport.setActiveItem(mapview);
       
    }
})