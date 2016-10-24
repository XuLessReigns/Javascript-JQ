//添加节点
function addTr(obj){
	var tr = document.createElement("tr");
	tbody.appendChild(tr);
	tr.innerHTML = '<td><input type="checkbox" class="ck"  /></td><td><img src="' + obj.imgSrc + 
	'" alt="" /></td><td>' + obj.desc + '</td><td><button class="down">-</button>' + 
	'<input type="text" value="' + obj.count + '" readonly="readonly" /><button class="up">+</button>' + 
	'</td><td>￥<span>' + obj.price + '</span></td><td>￥<span>' + obj.count*obj.price + '</span></td>' +
	'<td><button class="del"  >删除</button></td>';
}


