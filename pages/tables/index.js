var token=sessionStorage.getItem("token")
var dbName=sessionStorage.getItem("dbName");
var relName=sessionStorage.getItem("relName");



function resetForm(){
    for(let i=0;i<arr.length;i++){
        $("#"+arr[i].colName).val("")
    }
}

function saveForm(){
    var jsonStr=validateAndGetForm01();
    if(jsonStr===""){
        return;
    }
    var req=createPUTRequest(token, jsonStr, dbName, relName);
    console.log(req);
    jQuery.ajaxSetup({async:false});
    var resultObj=executeCommand(req,imlPartUrl);
    jQuery.ajaxSetup({async:true});
    var resultStr=JSON.stringify(resultObj);
    console.log(resultStr);
    disableFields();
}

function validateAndGetForm01(){
    
    var jsonStr={
        
    }
    for(let i=0;i<arr.length;i++){
        jsonStr[""+arr[i].colName]=$("#"+arr[i].colName).val()
    }
    return JSON.stringify(jsonStr);
}

function checkID(){
    var jsonStr=validateAndGetForm02();
    console.log(jsonStr)
    if(jsonStr===""){
        return;
    }
    var checkReq=createGET_BY_KEYRequest(token, dbName, relName, jsonStr, true, true);
    console.log(checkReq)
    jQuery.ajaxSetup({async:false});
    var resultObj=executeCommand(checkReq,"/api/irl");
    jQuery.ajaxSetup({async:true});
    if(resultObj["status"]==200){
        disenable01();
        result=JSON.parse(resultObj.data);
        for(let i=0;i<arr.length;i++){
            $("#"+arr[i].colName).val(result.record[arr[i].colName]);
        }
        disableFields();
    }
    else
    disenable02();
}

function validateAndGetForm02(){
    var str=$("#"+arr[0].colName).val();
    if(str===""){
        return;
    }
    var jsonStr={

    }
    jsonStr[""+arr[0].colName]=str
    return JSON.stringify(jsonStr);
}

function disenable01(){
    $("#save").attr('disabled',true);
    $("#reset").attr('disabled',true);
}

function disenable02(){
    $("#change").attr('disabled',true);
}

function updateRecord(){
    var jsonStr=validateAndGetForm01();
    if(jsonStr===""){
        return;
    }
    var primaryKey=""+arr[0].colName;
    var updateReq=createSETRequest(token, jsonStr, dbName, relName,"UPDATE",primaryKey)
    console.log(updateReq);
    jQuery.ajaxSetup({async:false});
    var resultObj=executeCommand(updateReq,"/api/iml/set");
    jQuery.ajaxSetup({async:true});
    console.log(JSON.stringify(resultObj));
    disableFields();
}

function disableFields(){
    for(let i=0;i<arr.length;i++){
        $('#'+arr[i].colName).attr('readonly', true);
    }
    $("#save").attr("disabled",true);
}    

function enableFields(){
    for(let i=0;i<arr.length;i++)
    $('#'+arr[i].colName).attr('readonly', false);
    $("#save").attr("disabled",false);
    $("#reset").attr("disabled",false);
}       

function goToFirst(){
    var firstReq=createFIRST_RECORDRequest(token, dbName, relName, true, true);
    jQuery.ajaxSetup({async:false});
    var resultObj01=executeCommand(firstReq,irlPartUrl);
    jQuery.ajaxSetup({async:true});
    var result01=JSON.parse(resultObj01.data);
    for(let i=0;i<arr.length;i++){
        $("#"+arr[i].colName).val(result01.record[""+arr[i].colName]);
    }
    $("#first").attr("disabled",true);
    $("#previous").attr("disabled",true);
    $("#next").attr("disabled",false);
    $("#last").attr("disabled",false);
}

function goToLast(){
    var lastReq=createLAST_RECORDRequest(token, dbName, relName, true, true);
    jQuery.ajaxSetup({async:false});
    var resultObj01=executeCommand(lastReq,irlPartUrl);
    jQuery.ajaxSetup({async:true});
    var result01=JSON.parse(resultObj01.data);
    for(let i=0;i<arr.length;i++){
        $("#"+arr[i].colName).val(result01.record[""+arr[i].colName]);
    }
    $("#last").attr("disabled",true);    
    $("#next").attr("disabled",true);
    $("#prev").attr("disabled",false);
}

function goToNext(){
    var jsonStr=validateAndGetForm02();
    if(jsonStr===""){
        return;
    }
    var checkReq=createGET_BY_KEYRequest(token, dbName, relName, jsonStr, true, true);
    jQuery.ajaxSetup({async:false});
    var resultObj=executeCommand(checkReq,irlPartUrl);
    jQuery.ajaxSetup({async:true});
    var result01=JSON.parse(resultObj.data);
    var recordNumber=result01["rec_no"];
    var nextReq=createNEXT_RECORDRequest(token, dbName, relName, recordNumber, true, true);
    jQuery.ajaxSetup({async:false});
    var resultObj01=executeCommand(nextReq,irlPartUrl);
    jQuery.ajaxSetup({async:true});
    if(resultObj01["status"]==400){
        $("#next").attr("disabled",true);
        $("#last").attr("disabled",true);
        return;
    }
    var result=JSON.parse(resultObj01.data);
    for(let i=0;i<arr.length;i++){
        $("#"+arr[i].colName).val(result.record[""+arr[i].colName]); 
    }
    
    $("#first").attr("disabled",false);
    $("#previous").attr("disabled",false);
}

function goToPrevious(){
    var jsonStr=validateAndGetForm02();
    if(jsonStr===""){
        return;
    }
    var checkReq=createGET_BY_KEYRequest(token, dbName, relName, jsonStr, true, true);
    jQuery.ajaxSetup({async:false});
    var resultObj=executeCommand(checkReq,irlPartUrl);
    jQuery.ajaxSetup({async:true});
    var result01=JSON.parse(resultObj.data);
    var recordNumber=result01["rec_no"];
    var nextReq=createPREV_RECORDRequest(token, dbName, relName, recordNumber, true, true);
    jQuery.ajaxSetup({async:false});
    var resultObj01=executeCommand(nextReq,irlPartUrl);
    jQuery.ajaxSetup({async:true});
    if(resultObj01["status"]==400){
        $("#previous").attr("disabled",true);
        $("#first").attr("disabled",true);
        return;
    }
    var result=JSON.parse(resultObj01.data);
    for(let i=0;i<arr.length;i++){
        $("#"+arr[i].colName).val(result.record[""+arr[i].colName]); 
    }
    
    $("#last").attr("disabled",false);
    $("#next").attr("disabled",false);
}