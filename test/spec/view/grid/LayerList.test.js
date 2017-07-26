describe('SHOGun.admin.view.grid.LayerList', function() {
    var LayerList;

    beforeEach(function() {
        LayerList = Ext.create('SHOGun.admin.view.grid.LayerList');
    });

    afterEach(function() {
        LayerList.destroy();
    });

    describe('Basics', function() {
        it('is defined', function() {
            expect(SHOGun.admin.view.grid.LayerList).to.not.be(undefined);
        });
        it('has a ViewController', function() {
            expect(LayerList.getController()).to.be.an(SHOGun.admin.view.grid.LayerListController);
        });
        it('has a ViewModel', function() {
            expect(LayerList.getViewModel()).to.be.an(SHOGun.admin.view.grid.LayerListModel);
        });
        it('has a store of type "layers"', function() {
            expect(LayerList.getStore()).to.be.an(SHOGun.admin.store.Layers);
        });
    });
});
