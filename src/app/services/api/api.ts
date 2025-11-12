import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Api {

  items: any[] = [
   
    {
    id: '1',
    name: 'Asiago',
    // Price is based on the per kg rate derived from a 250g item (₱549 / 0.25 kg ≈ ₱2,196/kg)
    price: 2196,
    status: true,
    rating: 4.6,
    cover: 'assets/cheese/Asiago.jpg',
    description: "An Italian cow’s-milk cheese available in fresh (softer, milder) and aged (firmer, more intense) versions; used sliced, melted or grated."
  },
  {
    id: '2',
    name: 'Brie',
    // Price is based on a retail rate of ₱2114/kg.
    price: 2114,
    status: true,
    rating: 4.8,
    cover: 'assets/cheese/Brie.jpg',
    description: 'A soft-ripened cow’s-milk cheese from France, with a creamy, buttery interior and a white edible rind. It has mild fruity and nutty notes.'
  },
  {
    id: '3',
    name: 'Burrata',
    // Price is estimated based on common retail prices, since Burrata is typically sold in small balls (e.g., 250g for ~₱635, making it ~₱2,540/kg)
    price: 2540,
    status: true,
    rating: 4.9,
    cover: 'assets/cheese/Burrata.jpg',
    description: 'An Italian cow’s-milk cheese: a pouch of fresh mozzarella filled with cream and curds; when cut it oozes creamy centre rich and decadent.'
  },
  {
    id: '4',
    name: 'Camember de Normandie',
    // Assuming a similar price profile to premium Camembert (~₱2,100/kg)
    price: 2100,
    status: true,
    rating: 4.7,
    cover: 'assets/cheese/CamembertdeNormandie.jpg',
    description: 'A specific traditional version of Camembert with Protected Designation of Origin from Normandy; stronger flavour and rich aroma compared to some generic versions.'
  },
  {
    id: '5',
    name: 'Camembert',
    // Price is estimated based on 125g price of ₱205 (₱205 / 0.125 kg = ₱1,640/kg)
    price: 1640,
    status: true,
    rating: 4.4,
    cover: 'assets/cheese/Camembert.jpg',
    description: 'A soft, creamy French cow’s-milk cheese similar to Brie but typically stronger in flavour when fully ripe.'
  },
  {
    id: '6',
    name: 'Cheddar',
    // Price is based on a local 1kg block of a popular brand (₱294/kg)
    price: 294,
    status: true,
    rating: 4.2,
    cover: 'assets/cheese/Cheddar.jpg',
    description: 'A widely-known English cheese, firm in texture and flavour ranging from mild to sharp depending on age; very versatile in cooking.'
  },
  {
    id: '7',
    name: 'Cottage Cheese',
    // Price is estimated based on common retail of 235g for ₱235 (~₱1,000/kg)
    price: 1000,
    status: true,
    rating: 4.0,
    cover: 'assets/cheese/CottageCheese.jpg',
    description: 'A fresh cheese with loose curds and mild flavour, typically made from cow’s milk; often eaten as a snack or used in light dishes.'
  },
  {
    id: '8',
    name: 'Edam',
    // Price is based on a listed retail price of ₱450/kg
    price: 450,
    status: true,
    rating: 4.4,
    cover: 'assets/cheese/Edam.jpg',
    description: 'A Dutch cow’s-milk semi-hard cheese, traditionally coated in red wax; young Edam is mild and slightly salty, ages to firmer and more intense flavour.'
  },
  {
    id: '9',
    name: 'Emmental',
    // Price is based on a retail rate of ₱2,145/kg
    price: 2145,
    status: true,
    rating: 4.5,
    cover: 'assets/cheese/Emmental.jpg',
    description: 'Also from Switzerland, known for its large “eyes” (holes) and mild, somewhat nutty flavour; used in sandwiches, fondues, and as a table cheese.'
  },
  {
    id: '10',
    name: 'Feta',
    // Price is based on a listed 1kg block of a popular imported brand (₱700/kg)
    price: 700,
    status: true,
    rating: 4.6,
    cover: 'assets/cheese/Feta.jpg',
    description: 'A soft, crumbly cheese from Greece (traditionally made from sheep or goat milk) with a tangy, salty flavour; often used in salads or Mediterranean recipes.'
  },
  {
    id: '11',
    name: 'Fontina',
    // Price is based on a listed S&R price of ₱1,060/kg
    price: 1060,
    status: true,
    rating: 4.5,
    cover: 'assets/cheese/Fontina.jpg',
    description: 'An Italian cow’s-milk semi-hard cheese, melts very well, flavour is creamy with slight nuttiness; ideal for fondues, grilled dishes.'
  },
  {
    id: '12',
    name: 'GoatCheese(Chèvre)',
    // Price is based on a listed 1kg log price (₱3,090/kg)
    price: 3090,
    status: true,
    rating: 4.7,
    cover: 'assets/cheese/GoatCheese(Chèvre).jpg',
    description: 'Cheese made from goat’s milk (or mixed) which tends to have a tangy, sometimes barn-yard flavour; textures range from soft spreadable to firmer aged logs.'
  },
  {
    id: '13',
    name: 'Gorgonzola',
    // Price is based on a retail rate of ₱2,350/kg
    price: 2350,
    status: true,
    rating: 4.7,
    cover: 'assets/cheese/Gorgonzola.jpg',
    description: 'An Italian blue-veined cow’s-milk cheese, with creamy texture (especially the “dolce” variety) and bold flavour; great in sauces or with fruit/wine.'
  },
  {
    id: '14',
    name: 'Gouda',
    // Price is based on Double Cream Gouda retail rate (₱1,250/kg)
    price: 1250,
    status: true,
    rating: 4.3,
    cover: 'assets/cheese/Gouda.jpg',
    description: 'A Dutch cow’s-milk cheese, young varieties are smooth and mild, while aged Gouda develops caramel and nutty flavours and a firmer texture.'
  },
  {
    id: '15',
    name: 'Gruyere',
    // Price is based on a retail rate of ₱2,550/kg
    price: 2550,
    status: true,
    rating: 4.6,
    cover: 'assets/cheese/Gruyere.jpg',
    description: 'A Swiss cow’s-milk cheese, semi-hard, with a slightly sweet and nutty flavour; famous for melting well (e.g., in fondue or gratins).'
  },
  {
    id: '16',
    name: 'Halloumi',
    // Price is based on a listed per-piece price which equates to ₱1,265/kg
    price: 1265,
    status: true,
    rating: 4.5,
    cover: 'assets/cheese/Halloumi.jpg',
    description: 'A semi-hard cheese from Cyprus (traditionally sheep/goat/cow milk), known for its high melting point great for grilling or frying so it keeps shape and gets golden.'
  },
  {
    id: '17',
    name: 'Havarti',
    // Price is estimated based on a 227g block price of ₱529 (₱529 / 0.227 kg ≈ ₱2,330/kg)
    price: 2330,
    status: true,
    rating: 4.4,
    cover: 'assets/cheese/Havarti.jpg',
    description: 'A Danish cow’s-milk semi-soft cheese; creamy texture with mild flavour, often with small holes or sometimes marbling; good for melting or snacking.'
  },
  {
    id: '18',
    name: 'Manchego',
    // Price is based on a listed 1kg block price of Semicurado (₱4,500/kg)
    price: 4500,
    status: true,
    rating: 4.7,
    cover: 'assets/cheese/Manchego.jpg',
    description: 'A Spanish sheep’s-milk cheese from the La Mancha region; firm and compact, with a buttery-nutty flavour and distinctive rind pattern.'
  },
  {
    id: '19',
    name: 'Mascarpone',
    // Price is based on a listed 1kg tub price (₱958/kg)
    price: 958,
    status: true,
    rating: 4.3,
    cover: 'assets/cheese/Mascarpone.jpg',
    description: 'An Italian fresh cream cheese (very rich and creamy) used especially in desserts (think tiramisu) or as a luxurious spread or filling.'
  },
  {
    id: '20',
    name: 'Monterey Jack',
    // Price is estimated based on a 190g block price of ₱237 (₱237 / 0.19 kg ≈ ₱1,247/kg)
    price: 1247,
    status: true,
    rating: 4.2,
    cover: 'assets/cheese/MontereyJack.jpg',
    description: 'An American cow’s-milk cheese, semi-soft, mild flavour, melts well; variants such as “Pepper Jack” incorporate spicy peppers for more kick.'
  },
  {
    id: '21',
    name: 'Mozzarella',
    // Price is estimated for bulk/block mozzarella, which is typically cheaper than imported Burrata/Fior di Latte. (~₱800/kg)
    price: 800,
    status: true,
    rating: 4.3,
    cover: 'assets/cheese/Mozzarella.jpg',
    description: 'A fresh Italian cheese, originally from buffalo milk (though cow’s-milk versions are common), soft and creamy, often used in salads (e.g., Caprese) or melted on pizzas.'
  },
  {
    id: '22',
    name: 'Parmesan',
    // Price is for Parmigiano-Reggiano, typically very expensive (~₱3,000/kg)
    price: 3000,
    status: true,
    rating: 5.0,
    cover: 'assets/cheese/Parmesan.jpg',
    description: 'A very hard Italian cow’s-milk cheese aged for long periods, with rich, nutty, and savory flavour; commonly grated over pasta or eaten in chunks.'
  },
  {
    id: '23',
    name: 'Pecorino Romano',
    // Price is estimated to be similar to Parmigiano-Reggiano due to being a hard, aged Italian cheese, sometimes slightly less expensive (~₱2,800/kg)
    price: 2800,
    status: true,
    rating: 4.8,
    cover: 'assets/cheese/PecorinoRomano.jpg',
    description: 'An Italian hard sheep’s-milk cheese, salty and sharp often used grated over pasta dishes or salads rather than eaten in large slices.'
  },
  {
    id: '24',
    name: 'Pecorino Toscano',
    // Price is estimated to be similar to Pecorino Romano (~₱2,600/kg)
    price: 2600,
    status: true,
    rating: 4.7,
    cover: 'assets/cheese/PecorinoToscano.jpg',
    description: 'A firm Italian sheep’s-milk cheese from Tuscany (PDO protected) with a flavour that deepens with age; slightly sweet when young, more robust when matured.'
  },
  {
    id: '25',
    name: 'Provolone',
    // Price is estimated for a good quality imported block (~₱1,500/kg)
    price: 1500,
    status: true,
    rating: 4.4,
    cover: 'assets/cheese/Provolone.jpg',
    description: 'An Italian cow’s-milk cheese available in varieties like “dolce” (mild) and “piccante” (sharp); some smoked versions; good for melting or slicing.'
  },
  {
    id: '26',
    name: 'Ricotta Salata',
    // Price is estimated as it's an aged, salted ricotta, which is firmer and more expensive than fresh ricotta (~₱1,800/kg)
    price: 1800,
    status: true,
    rating: 4.3,
    cover: 'assets/cheese/RicottaSalata.jpg',
    description: 'A variation of ricotta that is pressed, salted and aged so it becomes firmer and more sliceable than fresh ricotta; good for grating or topping dishes.'
  },
  {
    id: '27',
    name: 'Ricotta',
    // Price is estimated for fresh, imported ricotta (~₱900/kg)
    price: 900,
    status: true,
    rating: 4.1,
    cover: 'assets/cheese/Ricotta.jpg',
    description: 'A fresh, un-aged cheese made from whey (often from cow’s milk) with a soft, moist texture and mild taste; commonly used in pastas, desserts, or spreads.'
  },
  {
    id: '28',
    name: 'Roquefort',
    // Price is estimated based on common retail prices, often sold in wedges (~₱2,925/kg)
    price: 2925,
    status: true,
    rating: 4.9,
    cover: 'assets/cheese/Roquefort.jpg',
    description: 'A French blue-veined sheep’s-milk cheese, aged in caves; intense flavour, tangy and salty with characteristic blue/green mold.'
  },
  {
    id: '29',
    name: 'Smoked Gouda',
    // Price is typically a premium on regular Gouda (~₱1,800/kg)
    price: 1800,
    status: true,
    rating: 4.5,
    cover: 'assets/cheese/SmokedGouda.jpg',
    description: 'Essentially a variation of Gouda which has been smoked so it acquires a deeper flavour, a slightly brownish rind/interior and smokey aroma great for sandwiches or cheese boards.'
  },
  {
    id: '30',
    name: 'Stilton',
    // Price is estimated to be similar to other blue cheeses like Roquefort, as it is a premium English cheese (~₱2,700/kg)
    price: 2700,
    status: true,
    rating: 4.8,
    cover: 'assets/cheese/Stilton.jpg',
    description: 'An English blue-veined cow’s-milk cheese strong flavour with rich, crumbly texture; often enjoyed with port wine or on a cheese board.'
  }
  ];

  constructor() { }

  coupons: any[] = [
    {
      id: "1",
      code: "SAVE10",
      discount: 10,
      isPercentage: true,
      description: "Get 10% off on your order",
      isActive: true,
      expiryDate: "2026-06-30",
      minimumOrderAmount: 50,
    },
    {
      id: "2",
      code: "FREESHIP",
      discount: 50,
      isPercentage: false,
      description: "50 pesos off on all orders",
      isActive: true,
      expiryDate: "2026-12-31",
    },
    {
      id: "3",
      code: "BUNDLEDEAL",
      discount: 20,
      isPercentage: true,
      description: "Buy one get one 50% off",
      isActive: false,
      expiryDate: "2026-09-15",
    },
    {
      id: "4",
      code: "GIFTSHOP",
      discount: 30,
      isPercentage: true,
      description: "Get 30% off on orders above 1000",
      isActive: true,
      expiryDate: "2026-12-31",
      minimumOrderAmount: 1000,
    },
  ];


   getCoupons() {
    return this.coupons.filter(coupon => coupon.isActive);
  }
}
