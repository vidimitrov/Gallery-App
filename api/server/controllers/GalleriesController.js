module.exports = (function () {

    function getAll (req, res) {
        res.send(['gallery1', 'gallery2', 'gallery3']);
    }

    function getById (req, res) {
        res.send('gallery1');
    }

    function create (req, res) {

    }

    function update (req, res) {

    }

    function remove (req, res) {

    }

    return {
        getAll: getAll,
        getById: getById,
        create: create,
        update: update,
        remove: remove
    }
})();