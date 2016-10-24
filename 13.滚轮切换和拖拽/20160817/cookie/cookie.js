	/*
		����cookie��������ʽ��
			document.cookie  = ��name=value(���е�)[;expires=date][;path=path-to-resource][;domain=����][;secure]��
			name=value �Ǳ����е�
			[]�еĲ��֣��ǿ�ѡ��

	 */

	 //���ӡ��޸ġ�ɾ������ȡ
	 /*
		���ܣ����ӻ��޸�cookie
			name:cookie�����֣�
			value:cookie��ֵ
			expires������ʱ�� �������ʾ��
			path��·������
			domain:��������
			secure:��ȫ��־
	  */
	 function setCookie(name,value,expires,path,domain,secure){
		var dec = encodeURIComponent(name) + "=" + encodeURIComponent(value);  // ���е�name=value
		//ʧЧʱ��
		if(expires){
			var date = new Date();
			date.setTime(date.getTime()+expires);
			dec = dec + ";expires="+date;
		}

		//·������
		if(path){
			dec = dec + ";path="+path;
		}

		//��������
		if(domain){
			dec = dec + ";domain="+domain;
		}

		//��ȫ��־
		if(secure=="secure"){
			dec = dec + ";secure";
		}

		document.cookie = dec;
	 }
	

	 /*
		ɾ��cookie
			����cookie��������ɾ��
			name:cookie������
	  */
	  function removeCookie(name){
		setCookie(name,getCookie(name),-1);
	  }
	  
	  /*
		��ȡcookie��ֵ
			����cookie������������ȡ
			name:cookie������
	  */
	  function getCookie(name){
		 var cookies = document.cookie;
		 //gender=��; age=18; uName=�׷�
		 var arr = cookies.split("; ");  //����һ������  arr[index] --->gender=��
		 for(var i = 0;i<arr.length;i++){
			var strs = arr[i].split("=");    //strs[0] name strs[1] value
			if(encodeURIComponent(name)==strs[0]){
				return decodeURIComponent(strs[1]);
			}
		 }

	  }