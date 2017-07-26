Ext.define('SHOGun.admin.view.viewport.ViewportModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.shogun-mainviewport',

    data: {
        currentView: null,
        user: null,
        allowCreateOrEditWebmaps: false,
        i18n: {
            logoutTitle: 'Log out',
            logoutMessage: 'Are you sure you want to log out?'
        }
    },
    formulas: {
        profileImage: function() {
            var profileImage;
            if (this.get('user') && this.get('user').getData()) {
                profileImage = this.get('user').getData().profileImage;
            }
            if (!profileImage) {
                profileImage = 'resources/images/emptyUserAvatar.png';
            }
            return profileImage;
        }
    }
});
