// naming convention: PacketerCheckoutModule + moduleId (first letter in upper case)

var PacketeryCheckoutModuleSupercheckout = {

    getSelectedInput: function () {
        var $checked = $('#shipping-method input:checked');
        if ($checked.length === 1) {
            return $checked;
        }
        // for the case of switching address for which selected delivery is no longer available
        return $('#shipping-method input:eq(0)');
    },

    findDeliveryOptions: function () {
        return $('#shipping-method input');
    },

    // we're not able to enable/disable Supercheckout submit button, we register our own validator instead
    enableSubmitButton: function () {},
    disableSubmitButton: function () {},

    hideValidationErrors: function () {
        hideGeneralError();
    }
};

$(function () {
    if (typeof addSupercheckoutOrderValidator !== 'undefined') {
        addSupercheckoutOrderValidator(function() {

            var $selectedInput = PacketeryCheckoutModuleSupercheckout.getSelectedInput(),
                $extra = packeteryModulesManager.getWidgetParent($selectedInput),
                selectedBranchId = $extra.find('.packeta-branch-id').val();

            if ($extra.length === 1 && !selectedBranchId) {
                var error_text = $('.packetery-message-pickup-point-not-selected-error').data('content');
                throw { message: error_text };
            }
        });
    }
    $('input[name="shipping_address_value"], select[name="shipping_address_id"]').change(function () {
        packeteryModulesManager.clearOrderBranch();
        packeteryModulesManager.clearSelectedPickupPoint(PacketeryCheckoutModuleSupercheckout);
    });
});
