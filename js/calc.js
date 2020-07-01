var ogfare = 0;
var niufare = 0;
var penalty = 0;
var svf = 0; 
var farediff = 0;
var taxdiff = 0;
var addcol = 0;
var refund = 0;
var addfare = 0;
var reffare = 0;
var addtax = 0;
var reftax = 0;
var adall = 0;
var avios = 0;
var tsTotal = 0;
var avref = 0;
var currency = "";
var resultado = "";
var penalti = "PENALTY";

function copiar() {
    var strOg = document.getElementById("remarcas").value;
    var copyText = document.getElementById("remarcas");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
}

function copiarfirm() {
    var copyText = document.getElementById("firma");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
}

function refun() {
    penalti = "AMEND";
    document.getElementById("aviosinpt").removeAttribute("hidden");
    document.getElementById("norefun").checked = false;
}

function norefun() {
    penalti = "PENALTY";
    document.getElementById("aviosinpt").setAttribute("hidden", "true");
    document.getElementById("refun").checked = false;
}

function checkvalues() {

    tsTotal = document.getElementById("tsTotal").value.replace(",", ".");
    tsTotal = tsTotal || 0;

    ogfare = document.getElementById("ogfare").value.replace(",", ".");
    ogfare = ogfare || 0;

    niufare = document.getElementById("noobfare").value.replace(",", ".");
    niufare = niufare || 0;

    ogtax = document.getElementById("ogtax").value.replace(",", ".");
    ogtax = ogtax || 0;

    niutax = document.getElementById("noobtax").value.replace(",", ".");
    niutax = niutax || 0;

    penalty = document.getElementById("penalty").value.replace(",", ".");
    penalty = penalty || 0;

    svf = document.getElementById("svf").value.replace(",", ".");
    svf = svf || 0;

    if (tsTotal != 0 && niutax == 0) {
        niutax = tsTotal - niufare;
        niutax = Math.abs(niutax).toFixed(2);
        document.getElementById("noobtax").value = niutax;
    }
}

function calculate() {
    document.getElementById("remarks").removeAttribute("hidden");
    addfare, reffare, addtax, reftax, adall, refund, farediff = 0;
    avios = document.getElementById("newavios").value;
    if (avios == "") {
        avios = 0;
    }
    currency = document.getElementById("currency").value.toUpperCase();
    avref = document.getElementById("aviotipo").value;

    checkvalues();

    taxdiff = parseFloat(niutax) - parseFloat(ogtax);
    farediff = parseFloat(niufare) - parseFloat(ogfare);
    addcol = parseFloat(farediff) + parseFloat(taxdiff) + parseFloat(penalty) + parseFloat(svf);

    if (farediff >= 0) {
        resultado = "Additional Fare= " + farediff.toFixed(2) + " " + currency;
        addfare = parseFloat(farediff);
    } else {
        resultado = "Refundable Fare= " + Math.abs(farediff).toFixed(2) + " " + currency;
        reffare = Math.abs(parseFloat(farediff));
    }

    if (taxdiff >= 0) {
        resultado = resultado + "</br>Additional Tax= " + taxdiff.toFixed(2) + " " + currency;
        addtax = parseFloat(taxdiff);
    } else {
        resultado = resultado + "</br>Refundable Tax= " + Math.abs(taxdiff).toFixed(2) + " " + currency;
        reftax = Math.abs(parseFloat(taxdiff));
    }

    if (parseFloat(farediff) + parseFloat(taxdiff) < 0) {
        refund = parseFloat(farediff) + parseFloat(taxdiff);
        addcol = parseFloat(penalty) + parseFloat(svf);
        document.getElementById("result").innerHTML = resultado + "</br>Total Refund= " + Math.abs(refund).toFixed(2) + " " + currency + "</br>Additional Collection= " + addcol.toFixed(2) + " " + currency;
        adall = parseFloat(addcol);
    } else {
        document.getElementById("result").innerHTML = resultado + "</br>Additional Collection= " + addcol.toFixed(2) + " " + currency;
        adall = parseFloat(addcol);
    }
    var remarcado = "RX TOTAL ADDITIONAL FARE " + currency + " " + parseFloat(addfare).toFixed(2) + "=RX TOTAL ADDITIONAL TAXES " + currency + " " + parseFloat(addtax).toFixed(2) + "=RX TOTAL " + penalti + " FEES " + currency + " " + parseFloat(penalty).toFixed(2) + "=RX TOTAL CHANNEL FEES " + currency + " " + parseFloat(svf).toFixed(2) + "=RX TOTAL ADDITIONAL RFS " + currency + " 0.00=RX TOTAL ADDITIONAL COLLECTION " + currency + " " + parseFloat(adall).toFixed(2) + "=RX TOTAL ADJUSTED AVIOS " + avios + " " + avref + "=RX TOTAL FARE REFUND " + currency + " " + parseFloat(reffare).toFixed(2) + "=RX TOTAL TAXES REFUND " + currency + " " + parseFloat(reftax).toFixed(2) + "=RX TOTAL RESIDUAL CARD REFUND " + currency + " " + Math.abs(parseFloat(refund)).toFixed(2);
    var remarcadoFormat = remarkPrepare(remarcado);
    document.getElementById("remarcas").innerHTML = remarcadoFormat;
}

function remarkPrepare(remarcado) {
    var resultadito = "";
    if (remarcado.charAt(63) == " ") {
        resultadito = remarcado.substring(0, 63) + " " + remarcado.substring(63, remarcado.length);
    } else {
        resultadito = remarcado;
    }

    if (resultadito.length > 128) {
        console.log(resultadito.length);
        for (var i = 128; i < resultadito.length; i += 65) {
            if (resultadito.charAt(i) == " ") {
                resultadito = resultadito.substring(0, i) + " " + resultadito.substring(i, resultadito.length);
            }
        }
    }
    return resultadito;
}

window.onload = firmado;

function firmado() {
    let fecha = new Date();
    let meses = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    if(!localStorage.user){
        let user = window.prompt("Enter your name / Team").toUpperCase();
        localStorage.setItem("user", user);
    }
    document.getElementById("firma").innerHTML = "RXETKT REISSUED..EMAIL SENT.." + localStorage.getItem("user") + " " + fecha.getDate() + "" + meses[fecha.getMonth()] + "" + fecha.getFullYear().toString().substring(2, 4);
}

function conversion() {
    document.getElementById("resultado").removeAttribute("hidden");
    var formato = /[0-9]{1,5}.[0-9]{1,2}-[A-Z0-9]{2,4}/g;
    var taxes = document.getElementById("tasas").value;
    var tasas = taxes.match(formato);
    var conversion = "";
    if (tasas != null) {
        for (var i = 0; i < tasas.length; i++) {
            var tasa = tasas[i].replace("-", "");
            conversion = conversion + "/X" + tasa;
        }
    }
    document.getElementById("resultado").value = conversion;
    document.getElementById("tasasCop").removeAttribute("hidden");
}

function sumaTax() {
    var expresion = /[0-9]{1,5}.[0-9]{1,2}/g;
    var taxes = document.getElementById("tkTasas").value;
    var tasas = taxes.match(expresion);
    var sumaTasas = 0;
    if (tasas != null) {
        for (var i = 0; i < tasas.length; i++) {
            sumaTasas = parseFloat(sumaTasas) + parseFloat(tasas[i]);
        }
    }
    document.getElementById("suma").innerHTML = "Total: " + Math.abs(sumaTasas).toFixed(2);
}

function copiartax() {
    var copyText = document.getElementById("resultado");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
}

function limpiar() {
    document.getElementById("remarks").setAttribute("hidden", true);
    document.getElementById("ogfare").value = "";
    document.getElementById("noobfare").value = "";
    document.getElementById("ogtax").value = "";
    document.getElementById("noobtax").value = "";
    document.getElementById("penalty").value = "";
    document.getElementById("svf").value = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("remarcas").innerHTML = "";
    document.getElementById("newavios").value = "";
    document.getElementById("resultado").value = "";
    document.getElementById("tasas").value = "";
    document.getElementById("tsTotal").value = "";
    document.getElementById("resultado").setAttribute("hidden", "true");
    document.getElementById("tasasCop").setAttribute("hidden", "true");
    ogfare, niufare, ogtax, niutax, penalty, svf, addcol, addfare, reffare, addtax, reftax, adall, avios, tsTotal = 0;
    avref = "";
    currency = "";
}
