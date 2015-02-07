module.exports = (function () {

    function getAll (req, res) {
        res.send(['user1', 'user2', 'user3']);
    }

    function getById (req, res) {
        res.send('user1');
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