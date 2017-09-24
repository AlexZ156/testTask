export default (function() {
    var storageKey = '_miniStorage';

    function getCurrentData() {
        return localStorage.getItem(storageKey) || null;
    }

    function setCurrentData(obj: any) {
        localStorage.setItem(storageKey, JSON.stringify(obj));
    }

    return {
        setItem: function(key: string, value: any) {
            var currentData = JSON.parse(getCurrentData() || '{}');
            currentData[key] = value;
            setCurrentData(currentData);
        },
        getItem: function(key: string) {
            var currentData = getCurrentData();
            if (currentData) {
                return JSON.parse(currentData)[key];
            }
        },
        removeItem: function(key: string) {
            var currentData = getCurrentData();
            if (currentData) {
                currentData = JSON.parse(currentData);
                delete currentData[key];
                setCurrentData(currentData);
            }
        },
        clear: function() {
            localStorage.removeItem(storageKey);
        }
    };
}());
