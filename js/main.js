$(function () {
	$('[data-toggle="tooltip"]').tooltip();

	$(".dinheiro").maskMoney({
		prefix: "R$ ",
		decimal: ",",
		thousands: "."
	});


	$('.calcularBtn').click(function(){

		var tp = $('#tpval').val();
		var hd = $('#hdval').val();
		var cdp = $('#cdpval').maskMoney('unmasked')[0];
		var id = $('#idval').maskMoney('unmasked')[0];
		var imn = $('#imnval').maskMoney('unmasked')[0];
		var ii = $('#iival').maskMoney('unmasked')[0];
		var da = $('#daval').val();
		var hc = $('#hcval').val();

		console.log(calcular(tp, hd, cdp, id, imn, ii, da, hc));
	});

	$('.voltarBtn').click(function(){
		voltarTela();
	});

});

function calcular(tp, hd, cdp, id, imn, ii, da, hc)
{
	if(validacaoCampos() == true){
		console.log([tp, hd, cdp, id, imn, ii, da, hc]);

		var ctd = cdp*2*tp;
		var hm = hd*22;
		var ha = hm * 12;
		var ch = ctd / 244;
		var cm = ch * hm;
		var cp = ha * ch;
		var gp = cp;
		//
		var hid = (id / da) / hc;
		var ipD = hid * ha;
		var hlmn = (imn / da)/ hc;
		var ipDA = hlmn * ha;
		var ti = ii + ipD;

		// 
		var ano1 = (gp/ ti)-1; 
		var ano2 = (gp*2)/ (ipDA+ti); 
		var ano3 = (gp*3)/ (gp + (ipDA * 2)); 	

		var capacidade1 = ha / (da*hc);

		return montaResultado([ctd, hm, ha, ch, cm, cp, gp, hid, ipD, hlmn, ipDA, ti, ano1, ano2, ano3, capacidade1]);
	}

}

function numberToReal(numero) {
	var numero = numero.toFixed(2).split('.');
	numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
	return numero.join(',');
}

function voltarTela() {
	$('.digitaveisFields').show();
	$('.resultadosCalculadora').hide();
}

function montaResultado(arrayResultados) {

	console.log(arrayResultados);

	$('.digitaveisFields').hide();
	$('.resultadosCalculadora').show();

	$('#CTDvalue').html(numberToReal(arrayResultados[0]));
	$('#HMvalue').html(arrayResultados[1]);
	$('#HAvalue').html(arrayResultados[2]);
	$('#CHvalue').html(numberToReal(arrayResultados[3]));
	$('#CMvalue').html(numberToReal(arrayResultados[4]));
	$('#CPvalue').html(numberToReal(arrayResultados[5]));
	$('#GPvalue').html(numberToReal(arrayResultados[6]));
	$('#HIDvalue').html(numberToReal(arrayResultados[7]));
	$('#ipdvalue').html(numberToReal(arrayResultados[8]));
	$('#HImnvalue').html(numberToReal(arrayResultados[9]));
	$('#ipdavalue').html(numberToReal(arrayResultados[10]));
	$('#TIvalue').html(numberToReal(arrayResultados[11]));

	$('#1anovalue').html(arrayResultados[12].toFixed(2)+'%');
	$('#2anovalue').html(arrayResultados[13].toFixed(2)+'%');
	$('#3anovalue').html(arrayResultados[14].toFixed(2)+'%');
	$('#capacidade1').html(arrayResultados[15].toFixed(2)+'%');
	$('#capacidade2').html(arrayResultados[15].toFixed(2)+'%');
	$('#capacidade3').html(arrayResultados[15].toFixed(2)+'%');

	var ctx = document.getElementById('myChart').getContext('2d');
	var myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: ['1° ano', '2° ano', '3° ano'],
			datasets: [{
				label: 'Retorno (%)',
				data: [arrayResultados[12].toFixed(2), arrayResultados[13].toFixed(2), arrayResultados[14].toFixed(2)],
				backgroundColor: [
				'rgba(75, 192, 192, 0.2)',
				'rgba(54, 162, 235, 0.2)',
				'rgba(255, 206, 86, 0.2)',
				'rgba(75, 192, 192, 0.2)',
				'rgba(153, 102, 255, 0.2)',
				'rgba(255, 159, 64, 0.2)'
				],
				borderColor: [
				'rgba(75, 192, 192, 1)',
				'rgba(54, 162, 235, 1)',
				'rgba(255, 206, 86, 1)',
				'rgba(75, 192, 192, 1)',
				'rgba(153, 102, 255, 1)',
				'rgba(255, 159, 64, 1)'
				],
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}
	});
}

function validacaoCampos() {
	if($('#tpval').val() == ""){
		alert('Total de colaboradores nos processos não pode ficar em branco!');
		$('#tpval').focus();
		return false;
	}

	if($('#hdval').val() == ""){
		alert('Total de horas do processo por dia não pode ficar em branco!');
		$('#hdval').focus();
		return false;
	}

	if($('#cdpval').val() == ""){
		alert('Custo do persona não pode ficar em branco!');
		$('#cdpval').focus();
		return false;
	}

	if($('#idval').val() == ""){
		alert('Investimentos diretos não pode ficar em branco!');
		$('#idval').focus();
		return false;
	}

	if($('#imnval').val() == ""){
		alert('Investimento demais anos não pode ficar em branco!');
		$('#imnval').focus();
		return false;
	}

	if($('#iival').val() == ""){
		alert('Investimentos Indiretos não pode ficar em branco!');
		$('#iival').focus();
		return false;
	}

	if($('#daval').val() == ""){
		alert('Dias por ano não pode ficar em branco!');
		$('#daval').focus();
		return false;
	}

	if($('#hcval').val() == ""){
		alert('Horas capacidade não pode ficar em branco!');
		$('#hcval').focus();
		return false;
	}

	return true;
}