var _0xa3f4=["\x2E\x2E\x2F\x63\x6F\x6E\x66\x69\x67\x2E\x6A\x73","\x64\x69\x73\x63\x6F\x72\x64\x2E\x6A\x73","\x2E\x2E\x2F\x69\x6E\x64\x65\x78","\x72\x75\x6E","\x65\x78\x70\x6F\x72\x74\x73","\x69\x73\x43\x6F\x6D\x6D\x61\x6E\x64","\x67\x65\x74","\x73\x6C\x61\x73\x68\x63\x6F\x6D\x6D\x61\x6E\x64\x73","\x47\x75\x69\x6C\x64\x63\x6F\x6D\x6D\x61\x6E\x64\x73","\x6F\x77\x6E\x65\x72\x4F\x6E\x6C\x79","\x69\x64","\x75\x73\x65\x72","\x69\x6E\x63\x6C\x75\x64\x65\x73","\x6F\x77\x6E\x65\x72\x73","\u2757\x20\x2A\x2A\x2A\u0644\u0627\x20\u062A\u0633\u062A\u0637\u064A\u0639\x20\u0627\u0633\u062A\u062E\u062F\u0627\u0645\x20\u0647\u0630\u0627\x20\u0627\u0644\u0627\u0645\u0631\x2A\x2A\x2A","\x72\x65\x70\x6C\x79","\x62\x6F\x74\x50\x65\x72\x6D\x69\x73\x73\x69\x6F\x6E","\x70\x65\x72\x6D\x69\x73\x73\x69\x6F\x6E\x73","\x6D\x65","\x67\x75\x69\x6C\x64","\x69\x73\x41\x72\x72\x61\x79","\x68\x61\x73","\x70\x75\x73\x68","\x66\x6F\x72\x45\x61\x63\x68","\x6C\x65\x6E\x67\x74\x68","\u274C\x20\x49\x20\x64\x6F\x6E\x27\x74\x20\x68\x61\x76\x65\x20\x74\x68\x65\x20\x72\x65\x71\x75\x69\x72\x65\x64\x20\x70\x65\x72\x6D\x69\x73\x73\x69\x6F\x6E\x73\x3A\x20","\x2C\x20","\x6A\x6F\x69\x6E","","\x73\x65\x74\x44\x65\x73\x63\x72\x69\x70\x74\x69\x6F\x6E","\x23\x66\x66\x30\x30\x30\x30","\x73\x65\x74\x43\x6F\x6C\x6F\x72","\x61\x75\x74\x68\x6F\x72\x50\x65\x72\x6D\x69\x73\x73\x69\x6F\x6E","\x6D\x65\x6D\x62\x65\x72","\u274C\x20\x59\x6F\x75\x20\x64\x6F\x6E\x27\x74\x20\x68\x61\x76\x65\x20\x74\x68\x65\x20\x72\x65\x71\x75\x69\x72\x65\x64\x20\x70\x65\x72\x6D\x69\x73\x73\x69\x6F\x6E\x73\x3A\x20","\x45\x72\x72\x6F\x72\x20\x65\x78\x65\x63\x75\x74\x69\x6E\x67\x20\x63\x6F\x6D\x6D\x61\x6E\x64\x20","\x3A","\x65\x72\x72\x6F\x72"];
const config=require(_0xa3f4[0]);
const {Permissions,MessageEmbed}=require(_0xa3f4[1]);
const client=require(`${_0xa3f4[2]}`);
module[_0xa3f4[4]][_0xa3f4[3]]= async (client,_0xedd3x3)=>
{
	if(!_0xedd3x3[_0xa3f4[5]]())
	{
		return
	}
	const {commandName,options,user,guildId}=_0xedd3x3;
	const _0xedd3x4= await client[_0xa3f4[7]][_0xa3f4[6]](commandName)||  await client[_0xa3f4[8]][_0xa3f4[6]](commandName);
	if(!_0xedd3x4)
	{
		return
	}
	if(_0xedd3x4[_0xa3f4[9]]=== true)
	{
		if(!config[_0xa3f4[13]][_0xa3f4[12]](_0xedd3x3[_0xa3f4[11]][_0xa3f4[10]]))
		{
			return _0xedd3x3[_0xa3f4[15]]({content:`${_0xa3f4[14]}`,ephemeral:true})
		}
	}
	if(_0xedd3x4[_0xa3f4[16]])
	{
		const _0xedd3x5=[];
		const _0xedd3x6=_0xedd3x3[_0xa3f4[19]][_0xa3f4[18]][_0xa3f4[17]];
		if(_0xedd3x4[_0xa3f4[16]]&& Array[_0xa3f4[20]](_0xedd3x4[_0xa3f4[16]]))
		{
			_0xedd3x4[_0xa3f4[16]][_0xa3f4[23]]((_0xedd3x7)=>
			{
				if(!_0xedd3x6[_0xa3f4[21]](_0xedd3x7))
				{
					_0xedd3x5[_0xa3f4[22]](_0xedd3x7)
				}
			}
			)
		}
		if(_0xedd3x5[_0xa3f4[24]])
		{
			const _0xedd3x8= new MessageEmbed()[_0xa3f4[31]](_0xa3f4[30])[_0xa3f4[29]](`${_0xa3f4[25]}${_0xedd3x5[_0xa3f4[27]](_0xa3f4[26])}${_0xa3f4[28]}`);
			return _0xedd3x3[_0xa3f4[15]]({embeds:[_0xedd3x8],ephemeral:true})
		}
	}
	if(_0xedd3x4[_0xa3f4[32]])
	{
		const _0xedd3x5=[];
		const _0xedd3x9=_0xedd3x3[_0xa3f4[33]][_0xa3f4[17]];
		_0xedd3x4[_0xa3f4[32]][_0xa3f4[23]]((_0xedd3x7)=>
		{
			if(!_0xedd3x9[_0xa3f4[21]](_0xedd3x7))
			{
				_0xedd3x5[_0xa3f4[22]](_0xedd3x7)
			}
		}
		);if(_0xedd3x5[_0xa3f4[24]])
		{
			const _0xedd3x8= new MessageEmbed()[_0xa3f4[31]](_0xa3f4[30])[_0xa3f4[29]](`${_0xa3f4[34]}${_0xedd3x5[_0xa3f4[27]](_0xa3f4[26])}${_0xa3f4[28]}`);
			return _0xedd3x3[_0xa3f4[15]]({embeds:[_0xedd3x8],ephemeral:true})
		}
	}
	try
	{
		if(_0xedd3x4)
		{
			_0xedd3x4[_0xa3f4[3]](client,_0xedd3x3)
		}
	}
	catch(error)
	{
		console[_0xa3f4[37]](`${_0xa3f4[35]}${commandName}${_0xa3f4[36]}`,error)
	}
}  
