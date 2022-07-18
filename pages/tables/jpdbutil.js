
function relNamesFunc(token,ele){
    var req=createGET_ALL_RELATIONRequest(token,ele)
    jQuery.ajaxSetup({async:false})
    var jsonStr=executeCommandAtGivenBaseUrl(req,"http://api.login2explore.com:5577","/api/irl")
    jQuery.ajaxSetup({async:true})
    return jsonStr.data
}

function createGET_ALL_DBRequest(token) {
    var req = "{\n"
            + "\"token\" : \""
            + token
            + "\","
            + "\n" + "\"cmd\" : \"GET_ALL_DB\"\n"
            + "}";
    return req;
}

function createGET_ALL_RELATIONRequest(token,dbName) {
    var req = "{\n"
            + "\"token\" : \""
            + token
            + "\","
            + "\n" + "\"cmd\" : \"GET_ALL_RELATION\""
            + "\,"
            + "\n" + "\"dbName\" : \""
            + dbName
            + "\",  "
            +"\n"
            + "}";
    return req;
}

function AddContents(ele){
    sessionStorage.setItem("dbName",ele.id)
    sessionStorage.setItem("relName",ele.innerHTML)
    location.reload()
}

function createGET_ALL_COLRequest(token,dbName,relName) {
    var req = "{\n"
            + "\"token\" : \""
            + token
            + "\","
            + "\n" + "\"cmd\" : \"GET_ALL_COL\""
            + ","
            + "\n" + "\"dbName\" : "
            + "\""
            + dbName
            +"\","
            + "\n" + "\"rel\" : "
            + "\""
            +relName
            +"\"\n"
            + "}";
    return req;
}

function createGET_ALL_ROWRequest(token,dbName,relName) {
    var req = "{\n"
            + "\"token\" : \""
            + token
            + "\","
            + "\n" + "\"dbName\" : "
            + "\""
            + dbName
            +"\","
            + "\n" + "\"cmd\" : \"GET_ALL\""
            + ","
            + "\n" + "\"rel\" : "
            + "\""
            +relName
            +"\"\n"
            + "}";
    return req;
}

function executeCommandAtGivenBaseUrl(reqString, dbBaseUrl, apiEndPointUrl) {
    var url = dbBaseUrl + apiEndPointUrl;
    var jsonObj;
    $.post(url, reqString, function (result) {
        jsonObj = JSON.parse(result);
    }).fail(function (result) {
        var dataJsonObj = result.responseText;
        jsonObj = JSON.parse(dataJsonObj);
    });
    return jsonObj;
}
