//单张图片上传，只考虑支持FileReader接口的浏览器
var formData = new FormData();
var flag = false;

function previewImage() {

	//判断浏览器是否有FileReader接口
	if (typeof FileReader == 'undefined') {
		// 不支持FileReader
		console.log('不支持FileReader预览图片')
		//如果浏览器是ie
		if ($.browser.msie === true) {

		}
		//如果是不支持FileReader接口的低版本firefox 可以用getAsDataURL接口
		else if ($.browser.mozilla === true) {

		}
	} else { //支持FileReader接口  
		showPicture();
	}
}


//删除图片
function del(a) {
	//删除图片
	var b = $(a).parent();
	b.html('');
	//清空file的值
	var obj = document.getElementById('imgUpload');
	obj.value = ""
	$("#destination").css({
		"position": "absolute",
		"left": "-200px",
		"top": "30px",
		"z-index": "4",
		"margin-top": '0'
	});
	showPicture(); //重新定义onchange事件
}


//图片预览
function showPicture() {

	$("#imgUpload").change(
		function (e) {
			for (var i = 0; i < e.target.files.length; i++) {
				var file = e.target.files.item(i);
				console.log(file.size)
				//允许文件MIME类型 也可以在input标签中指定accept属性
				//console.log(/^image\/.*$/i.test(file.type));
				if (!(/^image\/.*$/i.test(file.type))) {
					continue; //不是图片 就跳出这一次循环
				}
				//实例化FileReader API
				var freader = new FileReader();
				freader.readAsDataURL(file);
				freader.onload = function (e) {
					console.log(e.target.result);
					var cssobj = {
						'background-image': 'url(' + e.target.result + ')',
						'background-repeat': 'no-repeat',
						'background-size': '100% 100%',
						'padding': '2px 5px'
					}
					$('.addphoto').css(cssobj)
					flag = true;
				}
			}
		});

}

// 表单提交事件
function sendPic() {
	console.log($("#imgUpload").prop('files'))
	if ($("#imgUpload").prop('files').length == 0) {
		toast('请选择一张图片');
		return false;
	}
	$('#frmx').submit()
}

function toast(msg) {
	$('.toast-wrap .toast-msg').html(msg);
	$('.toast-wrap .toast-msg').show();

	setTimeout(function () {
		$('.toast-wrap .toast-msg').hide();
	}, 1000);
}
// ajax和fromdata对象提交数据
function upload() {
	console.log('上传触发了')
	if (flag) {
		$.ajax({
			// headers: {
			// 	//Bearer是我的项目需要的,你可以按你的需求规范格式
			// 	'token': 'bf9acbb85f3fd3602c53e97f0bc40f2a8861',
			// },
			type: 'POST',
			dataType: "json",
			url: "http://172.31.0.117:8081/ejl-platform-web-api/user/avatar_mod",
			data: formData,
			cache: false,
			processData: false,
			contentType: false,
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				//错误访问所需执行的操作
			},
			success: function (data) {
				//正确访问所需执行的操作
				console.log(data)
			}
		});
	}
	flag = false
}