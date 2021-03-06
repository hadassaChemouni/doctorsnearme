﻿/**
 * Authored by Amaya
 */
Ext.define("DoctorsNearMe.model.Location", {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'id', type: 'string' },
            { name: 'name', type: 'string' },
            { name: 'formatted_address', type: 'string' },
            { name: 'geometry', type: 'auto' },
            { name: 'international_phone_number', type: 'string' },
            { name: 'reviews', type: 'auto' },
            { name: 'opening_hours', type: 'auto' },
            { name: 'types', type: 'auto' },
            { name: 'specialty', type: 'auto' },
            { name: 'isFavorite', type: 'boolean' },
            { name: 'likeCount', type: 'int' },
            { name: 'isLiked', type: 'boolean' },
            { name: 'place_id', type: 'string' },
            { name: 'isRaxaDoctor', type: 'boolean' },
            { name: 'raxa_uuid', type: 'string' }
        ]
    }
})