let game;
let current_room;

function addText(text, type) {
	
	let text_class = "";
	
	switch (type){
		case "error":
			text_class = "error-message";
			break;
		
		case "warning":
			text_class = "warning-message";
			break;
			
			
		default: 
			text_class = "regular-message";
	}
	
	let data = "<p class=\""+text_class+"\">" +text+ "</p>";
	
	data += "</p>" + document.getElementById("game-texts").innerHTML;
	
	document.getElementById("game-texts").innerHTML = data;
}



let formID = document.getElementById("game-form");

formID.addEventListener("submit", function (event) {
	event.preventDefault();

	let command = document.getElementById("game-command").value;

	let split = command.split(" ");


	if (split[0] == "mirar") {
		let info = "Puedes mirar: ";
		if (split.length < 2) {


			for (let i = 0; i < game.rooms[current_room].objects.length; i++) {

				info += game.rooms[current_room].objects[i] + ", ";
			}
			addText(game.rooms[current_room].desc);
			addText(info, "error");
		}
		else {
			for (let i = 0; i < game.rooms[current_room].objects.length; i++) {
				info += game.rooms[current_room].objects[i] + " ";

				if (game.rooms[current_room].objects[i] == split[1]) {

					addText(game.objects[split[1]]);
				}
			}
		}
	}

	else if (split[0] == "ir") {
		let info_exits = "Puedes ir a: ";
		let room_exits = game.rooms[current_room].exits.length;
		if (split.length < 2) {
			for (let i = 0; i < room_exits; i++) {

				info_exits += game.rooms[current_room].exits[i] + " ";
			}
			addText(info_exits, "error");
		}
		else {
			for (let i = 0; i < room_exits; i++) {

				if (split[1] == game.rooms[current_room].exits[i]) {

					current_room = game.rooms[current_room].exits[i];
					room_exits = game.rooms[current_room].exits.length;
				}


			}
			addText(current_room, "error");
			addText(game.rooms[current_room].name);
		}

	}
	else if (split[0] == "coger") {
		let info_objects = "Puedes coger: ";
		if (split.length < 2) {

			for (let i = 0; i < game.rooms[current_room].objects.length; i++) {

				info_objects += game.rooms[current_room].objects[i] + ", ";
			}
			addText(info_objects, "error");
		}
		else {
			for (let i = 0; i < game.rooms[current_room].objects.length; i++) {
				info_objects += game.rooms[current_room].objects[i] + " ";

				if (game.rooms[current_room].objects[i] == split[1]) {

					let contador = 0;
					for (let j = 0; j < inventory.items.length; j++) {

						
						if (inventory.items[j].name == "") {
							inventory.items[j].name = game.rooms[current_room].objects[i];
							inventory.items[j].desc = game.objects[split[1]];

							//addText(inventory.items[j].name, "error");
							//addText(inventory.items[j].desc, "error");
							info_objects = "Has cogido: " + game.rooms[current_room].objects[i];
							addText(info_objects);
							return;

						}

						else{
							contador++;
							if (contador == inventory.items.length) {
								addText("No tienes suficiente espacio en el inventario", "error");
                            }
                        }
						

						
					}

				}
			}
		}
	}
	else if (split[0] == "inventario") {
		let info_inventory = "Inventario: ";
		if (split.length < 2) {
			for (let i = 0; i < inventory.items.length; i++) {

				if (inventory.items[i].name != "") {
					info_inventory += inventory.items[i].name + ", ";
				}

			}
			addText(info_inventory, "error");
		} else {
			for (let i = 0; i < inventory.items.length; i++) {

				if (inventory.items[i].name == split[1])
					addText(inventory.items[i].desc);

			}
		}
	}
	else if (split[0] == "tirar") {
		let info_tirar = "Puedes tirar: ";
		if (split.length < 2) {
			for (let i = 0; i < inventory.items.length; i++) {

				if (inventory.items[i].name != "") {
					info_tirar += inventory.items[i].name + ", ";
				}

			}
			addText(info_tirar, "error");
		} else {
			for (let j = 0; j < inventory.items.length; j++) {
				if (inventory.items[j].name == split[1] ) {
					info_tirar = "Has tirado: " + inventory.items[j].name;
					inventory.items[j].name = "";
					inventory.items[j].desc = "";
					addText(info_tirar);
					return;
					
				}
			}
        }
	}
	document.getElementById("game-command").value = "";
	
	
});

let game_json = `
{
	"rooms": {
		"parking": {
			"name": "Parking",
			"desc": "El parking de ENTI, que es un poco mugroso. Ves que hay unas urracas, una verja asquerosa, unos coches no muy limpios y la entrada al edificio.",
			"exits": ["entrada"],
			"objects": ["coches", "verja", "urraca", "adelfa"]
		},
		"entrada": {
			"name": "Entrada de ENTI",
			"desc": "Hay un detector de metales transformado en un medidor de temperatura y 4 habitaciones.",
			"exits": ["comedor", "clase", "lavabos", "parking", "secretaría"],
			"objects": ["detector", "fuente", "hidrogel"]
		},
		"secretaría": {
			"name": "secretaría",
			"desc": "Solo entro aquí dentro para pedir un cargador de movil cuando me lo dejo en casa",
			"exits": ["entrada"],
			"objects": ["señora", "mosca"]
		},
		"comedor": {
			"name": "Comedor",
			"desc": "Aqui como antes de ir a las prácticas",
			"exits": ["entrada"],
			"objects": ["restos", "expendedoras"]
		},
		"clase": {
			"name": "Aula de los programadores",
			"desc": "Aqui huele un poco raro.",
			"exits": ["entrada"],
			"objects": ["ordenadores", "pizarra"]
		},
		"lavabos": {
			"name": "Retretes",
			"desc": "Aqui huele fatal",
			"exits": ["entrada"],
			"objects": ["mosca", "inodoro"]
		}
	},

	"objects": {

		"coches": "estan guarretes.",

		"adelfa": "La adelfa, conocida científicamente como Nerium oleander, es un arbusto que puede llegar a alcanzar los 6 metros de altura. Se trata de una especie perennifolia que se caracteriza por contar con un follaje siempre verde durante todo el año. Sus hojas se mantienen en su copa durante todo el año, de ahí que sea una de las especies perfectas si se busca tener un jardín verde incluso en invierno. Son pecioladas, glabras y pueden tener forma de lanza o ser más estrechas. Presentan un tamaño que no supera los 12 centímetros y son de un color verde-grisáceo. Pero si por algo destaca la adelfa es por sus grandes y llamativas flores. Se presentan en primavera y lo hacen formando inflorescencias en cimas corimbiformes (abiertas, racimosas en las que el eje es corto y los pedicelos de las flores son largos y se desarrollan a diferentes alturas). Sus tonalidades van desde el clásico rosa hasta por ejemplo el blanco, el rojo o el amarillo, siendo la primera lo más habitual.",

		"verja": "Una verja tan mierdosa que se la salta hasta mi abuela.",

		"urraca": "Vaya peazo de bicharraco.",

		"entrada": "La entrada principal al edificio.",

		"detector": "Temperatura correcta! :D",

		"fuente": "*bebe agüita*",

		"hidrogel": "está pringosete, puaj",

		"restos": "se lo va a acabar alguien?",

		"expendedoras": "a alguien se le ha atascado la cocacola",

		"señora": "Perdona, ¿me podria dejar un cargador?",

		"mosca": "Que grande es! Tiene hasta cejas!",

		"inodoro": "Se han olvidado de tirar de la cadena.",

		"pizarra": "se ve que estaban haciendo ejercicios de punteros... pobrecillos",

		"ordenadores": "Hay alguno que hecha humo"

	}
}
`;


game = JSON.parse(game_json);
current_room = "parking";


let inventory_item1 = {};
inventory_item1.name = "";
inventory_item1.desc = "";

let inventory_item2 = {};
inventory_item2.name = "";
inventory_item2.desc = "";

let inventory_item3 = {};
inventory_item3.name = "";
inventory_item3.desc = "";

let inventory_item4 = {};
inventory_item4.name = "";
inventory_item4.desc = "";

let inventory_item5 = {};
inventory_item5.name = "";
inventory_item5.desc = "";

let inventory_item6 = {};
inventory_item6.name = "";
inventory_item6.desc = "";

let inventory_item7 = {};
inventory_item7.name = "";
inventory_item7.desc = "";

let inventory_item8 = {};
inventory_item8.name = "";
inventory_item8.desc = "";

let inventory_item9 = {};
inventory_item9.name = "";
inventory_item9.desc = "";

let inventory_item10 = {};
inventory_item10.name = "";
inventory_item10.desc = "";

let inventory = {};
inventory.items = [inventory_item1, inventory_item2, inventory_item3, inventory_item4, inventory_item5, inventory_item6, inventory_item7, inventory_item8, inventory_item9, inventory_item10];



addText(game.rooms[current_room].name);
