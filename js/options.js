$( function () {

    // Saves options to chrome.storage
    function save_options() {
        var url1 = document.getElementById('url1').value;
        var url2 = document.getElementById('url2').value;

        chrome.storage.sync.set({
            tabs: [url1, url2]
        }, function () {
            // Update status to let user know options were saved.
            var status = document.getElementById('status');
            status.textContent = 'Options saved.';
            setTimeout(function () {
                status.textContent = '';
            }, 750);
        });
    }

    // Restores select box and checkbox state using the preferences
    // stored in chrome.storage.
    function restore_options() {
        // Use default value color = 'red' and likesColor = true.
        chrome.storage.sync.get({
            tabs: []
            }, function (items) {
                console.log(items);
                if(items.tabs.length > 0){
                    document.getElementById('url1').value = items.tabs[0];
                    document.getElementById('url2').value = items.tabs[1];
                }

        });
    }



    $('#newUrl').on('blur', function() {
        var $formGroup = $(this).parent();

        if($(this)[0].checkValidity()){
            $formGroup.removeClass('has-error').addClass('has-success');
            $("#error").hide();
        } else {
            $formGroup.removeClass('has-success').addClass('has-error');
            $("#error").show();
        }

    });

    $('#addUrlButton').click(function(){
        if($(this)[0].checkValidity()){
            // save to sync

            //add to table


        }

    });


});


