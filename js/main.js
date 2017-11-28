var canvas = document.getElementById("canvasPlaceHolder"),
    ctx = canvas.getContext("2d"),
    fileName = null,
    fileType = null,
    _prevFileType = null;

$("#pWidth,#pHeight,#filename,#fileType").change(function () {

    var _width = $('#pWidth').val();
    var _height = $('#pHeight').val();

    //logic for font resize
    var _dim = (_width + "X" + _height);
    var totalTextLen = 0;
    var space = 15;
    if (_width >= 240) {
        fontSize = (_width * 4 / 100);
    } else {
        fontSize = 13;
    }
    var returnFont = (fontSize + 'px' + ' courier');
    totalTextLen = (_dim.length / 2) + fontSize + space;

    //Canvas properties
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = _width;
    canvas.height = _height;
    ctx.fillStyle = 'silver';
    ctx.fillRect(0, 0, _width, _height);
    ctx.font = returnFont;
    ctx.fillStyle = '#fff';
    ctx.fillText(_width + ' x ' + _height, (_width / 2 - (totalTextLen)), (_height / 2 + 5));
    ctx.textAlign = "center";

    $('#pWidth, #pHeight').bind('keyup paste', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    $('#fileName').on({
        blur: function () {
            if ($(this).val().length <= 0) {

                fileName = 'placeholder';
                fileType = '.png';
            }
        },
        change: function () {
            if (_prevFileType == null) {

                _prevFileType = 'png';
            }
            fileName = $('#fileName').val() + '.' + _prevFileType;
        }
    });

    $('#selType').change(function () {

        fileType = $(this).val();
        _prevFileType = fileType;
        if ($("#fileName").val().length > 0) {
            fileName = $("#fileName").val() + '.' + _prevFileType;
        }
    });

    if ((_width.length && _height.length && $("#fileName").length > 0)) {

        $("#download").show();
    } else {
        $("#download").hide();
    }
    $("#canvasPlaceHolder").show();
})

$("#download").hide();
$("#canvasPlaceHolder").hide();

function downloadCanvas(link, canvasId, filename) {
    link.href = document.getElementById(canvasId).toDataURL();
    link.download = filename;
}


document.getElementById('download').addEventListener('click', function () {
    downloadCanvas(this, 'canvasPlaceHolder', fileName);
}, false);
