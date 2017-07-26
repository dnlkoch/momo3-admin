describe('SHOGun.admin.view.grid.UserList', function() {
    var UserList;

    beforeEach(function() {
        UserList = Ext.create('SHOGun.admin.view.grid.UserList');
    });

    afterEach(function() {
        UserList.destroy();
    });

    describe('Basics', function() {
        it('is defined', function() {
            expect(SHOGun.admin.view.grid.UserList).to.not.be(undefined);
        });
        it('has a ViewController', function() {
            expect(UserList.getController()).to.be.an(SHOGun.admin.view.grid.UserListController);
        });
        it('has a ViewModel', function() {
            expect(UserList.getViewModel()).to.be.an(SHOGun.admin.view.grid.UserListModel);
        });
        it('has a store of type "users"', function() {
            expect(UserList.getStore()).to.be.an(SHOGun.admin.store.Users);
        });
    });
});
