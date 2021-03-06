angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function ($scope, contatosAPI, operadorasAPI, serialGenerator) {
	$scope.app = "Lista Telefonica";
	$scope.contatos = [];
	$scope.operadoras = [];

	console.log(serialGenerator.generate());

	var carregarContatos = function () {
		contatosAPI.getContatos().then(function (response) {
			console.log(response.data);
			$scope.contatos = response.data;
		});
	};

	var carregarOperadoras = function () {
		operadorasAPI.getOperadoras().then(function (response) {
			console.log(response.data);
			$scope.operadoras = response.data;
		});
	};

	$scope.adicionarContato = function (contato) {	
		contato.serial = serialGenerator.generate();
		contatosAPI.saveContato(contato).then(function (response) {
			delete $scope.contato;
			$scope.formContato.$setPristine();
			carregarContatos();
		});
	};

	$scope.apagarContatos = function (contatos) {
		$scope.contatos = contatos.filter(function (contato) {
			if(!contato.selecionado) return contato;
		});
	};

	$scope.isContatoSelecionado = function (contatos) {
		return contatos.some(function (contato) {
			return contato.selecionado;
		});
	};

	$scope.ordenarPor = function(campo) {
		$scope.criterioDeOrdenacao = campo;
		$scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
	}

	carregarContatos();
	carregarOperadoras();

});
