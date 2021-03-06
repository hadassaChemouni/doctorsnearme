﻿/**
 * Authored by Amaya
 */
Ext.define('DoctorsNearMe.config.Runtime', {
    singleton: true,
    requires:'Ext.data.proxy.LocalStorage',

    config: {      
        domain: 'http://api.raxa.io/ws/rest/v1/',

        ratingServerDomain: 'http://192.168.122.1:8888/',
       // ratingServerDomain: 'http://192.168.56.1:8888/',
       // ratingServerDomain: 'http://192.168.1.2:8888/',

        /**
         * cfg {Object} set once user logs in 
         */
        user:null,

        /**
         * cfg {Boolean} If the user has logged in or not 
         */
        loggedIn: false,

        /**
         * cfg [Object] At app start this is set after loading from local storage 
         */
        favorites: [],

        /**
         * cfg {Object} Current language 
         */
        language: null,

        /**
         * cfg {String} set once user logs in 
         */
        userName: null,

        /**
         * cfg {String} set once user logs in 
         */
        password: null

    },

    constructor: function (config) {
        this.initConfig(config);
    },

    /*
    * Called inside app.js
    * @method
    * @public
    */
    startApp: function () {

            //destroy splash image and loading indicator
            Ext.fly('splash').destroy();
            Ext.fly('bluespin').destroy();
         
            DoctorsNearMe.config.setLanguage(EN);

            //create slide menu
            var menu = Ext.create('DoctorsNearMe.view.Menu');
            Ext.Viewport.add(menu);

           // var contactList = Ext.create('DoctorsNearMe.view.ContactList');
            //Ext.Viewport.add(contactList);

            //create mapview
            var mapView = Ext.create('DoctorsNearMe.view.MapView');
            Ext.Viewport.add(mapView);
            Ext.Viewport.setActiveItem(mapView);

            //create favorites store
            var favoritesStore = Ext.create('DoctorsNearMe.store.Memory', {
                storeId: 'fav-store'
            });

            //load from local storage
            favoritesStore.load();

            //store favorites from local storage in a runtime variable
            var currentFavorites = DoctorsNearMe.config.getFavorites();
            favoritesStore.getRange().forEach(function (record) {
                currentFavorites.push(Ext.JSON.decode(record.get('query')));
            });                  
    }
    

}, function () {
    DoctorsNearMe.config = this;
}
);