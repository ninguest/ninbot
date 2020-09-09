exports.getrandomColor = () =>{
    
    /*var length = 6;
    var chars = '0123456789ABCDEF';
    var hex = '0x';
    while(length--) hex += chars[(Math.random() * 16) | 0];
    console.log('hex:' + hex);
    console.log('math random' + Math.random());
    return hex;*/


    //return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);

    
    var colour = "#"+((1<<24)*Math.random()|0).toString(16);
    //console.log("Random Colour produced: "+ colour);
    return colour;
}

exports.YTUIDGet = (url) =>{

    const re = /^(https?:\/\/)?((www\.)?(youtube(-nocookie)?|youtube.googleapis)\.com.*(v\/|v=|vi=|vi\/|e\/|embed\/|user\/.*\/u\/\d+\/)|youtu\.be\/)([_0-9a-z-]+)/i;
        return url.match(re)[7];
}

