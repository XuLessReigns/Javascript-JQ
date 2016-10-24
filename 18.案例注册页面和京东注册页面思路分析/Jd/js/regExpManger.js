var regExpManger = {
	userNameReg:/^([\u4e00-\u9fa5]|[a-z-_])+$/i,
	pwdReg:/[^\u4e00-\u9fa5]+/i,
	wordReg:/[a-z]+/i,
	numberReg:/[0-9]+/,
	emailReg:/^[0-9A-z_]{6,22}@[0-9a-z]{2,8}\.[a-z]{2,3}$/,
	mobileReg:/^[1-3]\d{10}$/
};
