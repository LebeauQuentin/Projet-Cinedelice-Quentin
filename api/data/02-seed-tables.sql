BEGIN;

INSERT INTO "users" (email, password, first_name, last_name, is_admin, created_at, updated_at) VALUES
('admin@example.com', '$argon2id$v=19$m=65536,t=3,p=4$JpU8dkM14czpa4ItQJ0uLg$gFfrg4ucVzCREzi5OX+Ln/HXhE6Twiv3b8dT+E1QimA', 'Admin', 'User', TRUE, CURRENT_TIMESTAMP, NULL),
('john.doe@example.com', '$argon2id$v=19$m=65536,t=3,p=4$OhQ198fYoZ7DPAPtpyFkBw$w8lr89rLeA0A+qQBkgrJUvY1Oj4nX7sGharvr3Jo65Q', 'John', 'Doe', FALSE, CURRENT_TIMESTAMP, NULL),
('jane.smith@example.com', '$argon2id$v=19$m=65536,t=3,p=4$z30Pe5G1183wvm+lKAS1xw$iS2w9tLgGfhHDQfHS3X2wzmlNs5kWlTkktXc0WfBtIo', 'Jane', 'Smith', FALSE, CURRENT_TIMESTAMP, NULL);

-- Insertion des catégories
INSERT INTO "category" (name, color) VALUES
('Entrée', '#FFA07A'),
('Plat', '#FA8072'),
('Dessert', '#FFD700'),
('Boisson', '#ADFF2F');

-- Insertion des régimes alimentaires
INSERT INTO "diet" (name, color) VALUES
('Végétarien', '#32CD32'),
('Sans Gluten', '#FF4500'),
('Vegan', '#228B22'),
('Sans Lactose', '#4682B4'),
('Halal', '#8B0000');

-- Insertion des films
INSERT INTO "movie" (title, description, director, actors, year, image, funfact, category) VALUES
('Ratatouille', 'Un rat passionné de cuisine rêve de devenir un grand chef à Paris et s''associe à un jeune commis pour réaliser son rêve.', 'Brad Bird', 'Patton Oswalt', 2007, 'https://m.media-amazon.com/images/M/MV5BMTMzODU0NTkxMF5BMl5BanBnXkFtZTcwMjQ4MzMzMw@@._V1_SX300.jpg', 'Le restaurant Gusteau s''inspire du célèbre chef Bernard Loiseau.', 'Animation'),
('Julie & Julia', 'Une blogueuse décide de cuisiner toutes les recettes d''un livre culte, en parallèle de la vie de son auteure, Julia Child.', 'Nora Ephron', 'Meryl Streep, Amy Adams', 2009, 'https://m.media-amazon.com/images/M/MV5BMzA4NjA2NjI2NV5BMl5BanBnXkFtZTcwOTEzNzI2Mg@@._V1_SX300.jpg', 'Meryl Streep a pris des cours de cuisine pour incarner Julia Child.', 'Biopic'),
('Charlie et la chocolaterie', 'Un garçon pauvre gagne un ticket en or pour visiter la chocolaterie magique de Willy Wonka.', 'Tim Burton', 'Johnny Depp', 2005, 'https://m.media-amazon.com/images/I/71kqutZwNiL.jpg', 'Johnny Depp s''est inspiré de présentateurs TV excentriques pour son rôle.', 'Fantastique'),
('#Chef', 'Un chef étoilé quitte son restaurant et lance un food truck pour retrouver sa passion pour la cuisine.', 'Jon Favreau', 'Jon Favreau, Sofia Vergara', 2014, 'https://fr.web.img4.acsta.net/r_1280_720/pictures/15/01/15/13/49/285079.jpg', 'Roy Choi, célèbre chef de food trucks, a été consultant sur le film.', 'Comédie'),
('Le Festin de Babette', 'Une domestique prépare un somptueux repas transformant la vie des habitants d''un petit village.', 'Gabriel Axel', 'Stéphane Audran', 1987, 'https://fr.web.img3.acsta.net/medias/nmedia/18/93/75/79/20275758.jpg', 'Premier film danois à remporter l''Oscar du meilleur film étranger.', 'Drame'),
('Le Parrain', 'L''histoire d''une famille mafieuse italienne dirigée par Don Vito Corleone.', 'Francis Ford Coppola', 'Marlon Brando, Al Pacino, James Caan', 1972, 'https://m.media-amazon.com/images/M/MV5BNGEwYjgwOGQtYjg5ZS00Njc1LTk2ZGEtM2QwZWQ2NjdhZTE5XkEyXkFqcGc@._V1_SX300.jpg', 'Le chat sur les genoux de Marlon Brando était un ajout improvisé.', 'Drame'),
('Invictus', 'Nelson Mandela utilise le rugby pour unir une Afrique du Sud post-apartheid.', 'Clint Eastwood', 'Morgan Freeman, Matt Damon, Tony Kgoroge', 2010, 'https://m.media-amazon.com/images/M/MV5BNGEwYjgwOGQtYjg5ZS00Njc1LTk2ZGEtM2QwZWQ2NjdhZTE5XkEyXkFqcGc@._V1_SX300.jpg', 'Matt Damon a rencontré François Pienaar pour mieux comprendre son rôle.', 'Drame'),
('Saturday Night Fever', 'Un jeune homme trouve son échappatoire dans la danse disco à New York.', 'John Badham', 'John Travolta, Karen-Lynn Gorney, Joseph Cali', 1978, 'https://m.media-amazon.com/images/M/MV5BM2UxZGU5ZDItZmQ0NS00NzNlLTgwMGMtOGJkMzQ5N2QwZjNhXkEyXkFqcGc@._V1_SX300.jpg', 'La célèbre scène de danse de Travolta a été tournée en une seule prise.', 'Drame'),
('Chicken Run', 'Un groupe de poules tente de s''échapper d''une ferme avant d''être transformé en tourte.', 'Peter Lord, Nick Park', 'Mel Gibson, Julia Sawalha, Miranda Richardson', 2000, 'https://m.media-amazon.com/images/M/MV5BNTc3YTRlMWMtMWIxMC00Njk2LTg0MjktNWVjNTUzOTViZmNhXkEyXkFqcGc@._V1_SX300.jpg', 'Premier long-métrage en stop-motion des studios Aardman.', 'Animation'),
('Le Bon, la Brute et le Truand', 'Trois hommes cherchent un trésor caché en pleine guerre de Sécession.', 'Sergio Leone', 'Clint Eastwood, Eli Wallach, Lee Van Cleef', 1968, 'https://images.cinefil.com/movies/1049983.webp', 'La bande-son d''Ennio Morricone est devenue iconique.', 'Western'),
('Titanic', 'L''histoire tragique du naufrage du Titanic, vécue à travers la romance entre Jack et Rose.', 'James Cameron', 'Leonardo DiCaprio, Kate Winslet, Billy Zane', 1997, 'https://m.media-amazon.com/images/M/MV5BYzYyN2FiZmUtYWYzMy00MzViLWJkZTMtOGY1ZjgzNWMwN2YxXkEyXkFqcGc@._V1_SX300.jpg', 'Le film a nécessité la construction d''un Titanic à l''échelle 90%.', 'Drame'),
('La soupe aux choux', 'Un paysan bourru et son ami sont témoins d''une rencontre extraterrestre qui va bouleverser leur quotidien.', 'Jean Girault', 'Louis de Funès, Jean Carmet, Claude Gensac', 1981, 'https://cdn.cultura.com/cdn-cgi/image/width=1200/media/pim/TITELIVE/18_3259119696490_vid.jpg', 'Le film est inspiré du roman éponyme de René Fallet.', 'Comédie'),
('Le Grand Bleu', 'Ce film culte suit l''amitié et la rivalité entre deux plongeurs en apnée, Jacques Mayol et Enzo Molinari.', 'Luc Besson', 'Jean-Marc Barr, Jean Reno, Rosanna Arquette', 1988, 'https://antreducinema.fr/wp-content/uploads/2020/04/GRAND-BLEU.png', 'Les scènes sous-marines ont été tournées dans de véritables spots de plongée aux eaux cristallines.', 'Drame'),
('L''aile ou la cuisse', 'Un critique gastronomique rigoriste et son fils se retrouvent confrontés à l''industrialisation de la cuisine.', 'Claude Zidi', 'Louis de Funès, Coluche, Ann Zacharias', 1976, 'https://planete-vintage.com/cdn/shop/products/affcihe-laile-ou-la-cuisse.webp?v=1679413276', 'Le film a été en partie tourné dans de véritables restaurants gastronomiques.', 'Comédie'),
('Le Dîner de cons', 'Un éditeur cynique invite un homme naïf à un dîner où chaque invité doit amener un "con", mais la soirée ne se passe pas comme prévu.', 'Francis Veber', 'Thierry Lhermitte, Jacques Villeret, Francis Huster', 1998, 'https://fr.web.img6.acsta.net/medias/nmedia/18/36/10/96/19649758.jpg', 'Jacques Villeret a déjà joué son rôle au théâtre avant de l''interpréter au cinéma.', 'Comédie'),
('Le Voyage de Chihiro', 'Une fillette se retrouve piégée dans un monde fantastique peuplé d''esprits et doit trouver un moyen de sauver ses parents transformés en cochons.', 'Hayao Miyazaki', 'Rumi Hiiragi, Miyu Irino, Mari Natsuki', 2002, 'https://fr.web.img6.acsta.net/medias/nmedia/00/02/36/71/chihiro.jpg', 'Le film a remporté l''Oscar du meilleur film d''animation en 2003.', 'Animation'),
('La Cité de la peur', 'Une attachée de presse excentrique tente de promouvoir un film d''horreur alors qu''une série de meurtres étranges survient.', 'Alain Berbérian', 'Chantal Lauby, Alain Chabat, Dominique Farrugia', 1994, 'https://m.media-amazon.com/images/I/612H8hw5kjL.jpg', 'Le film est truffé de références humoristiques et de jeux de mots absurdes.', 'Comédie');

-- Insertion des recettes
INSERT INTO "recipe" (title, duration, description, difficulty, instruction, image, movie_id, category_id, user_id, validated) VALUES
('Soupe à l''oignon', 45, 'Une soupe classique', 'Facile', '§Éplucher et émincer les oignons. §Faire revenir les oignons dans du beurre jusqu''à ce qu''ils soient dorés. §Ajouter le bouillon et laisser mijoter 30 minutes. §Verser la soupe dans des bols, ajouter du fromage râpé et des croûtons. §Faire gratiner au four avant de servir.', 'http://localhost:3000/images-recettes/1_normal.webp', 15, 1, 1, TRUE),
('Bœuf Bourguignon', 180, 'Un plat mijoté', 'Difficile', '§Couper la viande en morceaux et la faire mariner avec du vin rouge, des carottes et des oignons pendant une nuit. §Faire revenir la viande dans une cocotte avec du beurre. §Ajouter les légumes et la marinade. §Laisser mijoter à feu doux pendant 3 heures. §Servir avec des pommes de terre ou des pâtes.', 'http://localhost:3000/images-recettes/2_normal.webp', 2, 2, 1, TRUE),
('Tarte Tatin', 60, 'Un dessert renversant', 'Moyen', '§Préchauffer le four à 180°C. §Caraméliser le sucre et le beurre dans un moule. §Disposer les pommes coupées en quartiers sur le caramel. §Recouvrir avec la pâte et enfourner 30 minutes. §Démouler à chaud et servir tiède.', 'http://localhost:3000/images-recettes/3_normal.webp', 5, 3, 1, TRUE),
('Ratatouille', 60, 'Un plat de légume fondant', 'Moyen', '§Laver et couper les légumes en rondelles. §Faire revenir les oignons et l''ail dans une poêle avec de l''huile d''olive. §Ajouter les légumes et laisser mijoter 40 minutes. §Assaisonner avec du sel, du poivre et des herbes de Provence. §Servir chaud ou froid.', 'http://localhost:3000/images-recettes/4_normal.webp', 1, 3, 1, FALSE),
('Fondant au chocolat', 35, 'Un dessert fondant', 'Facile', '§Préchauffer le four à 180°C. §Faire fondre le chocolat et le beurre au bain-marie. §Fouetter les œufs et le sucre jusqu''à blanchiment. §Incorporer la farine et le chocolat fondu. §Verser dans des moules et enfourner 10 minutes. §Déguster chaud avec une boule de glace.', 'http://localhost:3000/images-recettes/5_normal.webp', 3, 3, 2, TRUE),
('Mojito', 10, 'Un cocktail frais', 'Facile', '§Écraser la menthe et le sucre dans un verre. §Ajouter le jus de citron vert et le rhum. §Remplir le verre de glace pilée et compléter avec de l''eau gazeuse. §Remuer légèrement et servir avec une paille.', 'http://localhost:3000/images-recettes/6_normal.webp', 8, 4, 1, TRUE),
('Pâte à la Bolognaise', 20, 'Un plat italien traditionnel', 'Facile', '§Faire bouillir de l''eau et cuire les pâtes. §Faire revenir l''oignon et l''ail dans une poêle avec de l''huile d''olive. §Ajouter la viande hachée et la faire cuire. §Incorporer la sauce tomate et laisser mijoter 10 minutes. §Servir avec les pâtes et du parmesan râpé.', 'http://localhost:3000/images-recettes/7_normal.webp', 6, 2, 1, FALSE),
('Ramen au poulet', 35, 'Soupe japonaise gourmande', 'Facile', '§Faire bouillir de l''eau et cuire les œufs mollets. §Préparer un bouillon avec de la sauce soja, du gingembre et de l''ail. §Cuire les nouilles dans le bouillon. §Ajouter le poulet cuit et tranché. §Servir avec les œufs, des champignons et de la ciboule.', 'http://localhost:3000/images-recettes/8_normal.webp', 16, 2, 1, TRUE),
('Bobotie original', 100, 'Plat traditionnel Afrique du Sud', 'Facile', '§Préchauffer le four à 180°C. §Faire revenir les oignons et la viande hachée. §Ajouter les épices et les raisins secs. §Transférer dans un plat à gratin et verser un mélange d''œufs et de lait. §Enfourner pendant 45 minutes. §Servir avec du riz et de la confiture d''abricots.', 'http://localhost:3000/images-recettes/9_normal.webp', 7, 2, 3, TRUE),
('Pizza de la mama', 45, 'Pizza croustillante', 'Facile', '§Préparer une pâte à pizza et l''étaler sur une plaque. §Étaler la sauce tomate et ajouter les ingrédients de votre choix. §Parsemer de fromage râpé. §Enfourner à 220°C pendant 15 minutes. §Servir chaud.', 'http://localhost:3000/images-recettes/10_normal.webp', 4, 2, 2, TRUE),
('Poulet aux légumes', 90, 'Poulet mijoté sur un lit de végétaux', 'Facile', '§Faire revenir grossièrement le poulet dans une cocotte avec un peu d''huile. §Ajouter les légumes coupés en morceaux. §Incorporer des épices, du sel et du poivre. §Laisser mijoter à feu doux pendant 1 heure. §Servir chaud avec du riz ou des pommes de terre.', 'http://localhost:3000/images-recettes/11_normal.webp', 9, 2, 2, TRUE),
('Soupe aux choux', 45, 'Une soupe nourrissante', 'Facile', '§Faire bouillir 1L d''eau avec un bouillon cube. §Émincer le chou et l''ajouter à l''eau bouillante. §Ajouter des carottes et des pommes de terre coupées en morceaux. §Laisser mijoter 40 minutes. §Servir chaud avec du pain grillé.', 'http://localhost:3000/images-recettes/12_normal.webp', 12, 2, 2, TRUE),
('Île flottante', 20, 'Un dessert aérien', 'Facile', '§Chauffer du lait avec de la vanille dans une casserole. §Monter les blancs en neige avec du sucre. §Faire pocher les blancs dans le lait chaud. §Préparer une crème anglaise avec les jaunes d''œufs et le lait chaud. §Servir les blancs pochés sur la crème anglaise.', 'http://localhost:3000/images-recettes/13_normal.webp', 11, 3, 2, TRUE),
('Pavé de saumon', 20, 'Pavé de saumon sur son lit de poireaux', 'Facile', '§Laver et couper les poireaux en fines lamelles. §Faire revenir les poireaux dans une poêle avec du beurre. §Cuire le pavé de saumon à la poêle ou au four. §Servir le saumon sur les poireaux fondants. §Assaisonner avec du sel, du poivre et un filet de citron.', 'http://localhost:3000/images-recettes/14_normal.webp', 13, 2, 1, TRUE),
('Poulet Basquaise', 80, 'Poulet mijoté dans son bain de tomates', 'Facile', '§Hacher l''oignon et l''ail. §Faire revenir dans une cocotte avec de l''huile d''olive. §Ajouter les morceaux de poulet et les faire dorer. §Incorporer des tomates concassées, des poivrons et du vin blanc. §Laisser mijoter pendant 1 heure. §Servir avec du riz.', 'http://localhost:3000/images-recettes/15_normal.webp', 14, 2, 1, TRUE),
('Gencive de porc', 120, 'Un plat audacieux pour les vrais amateurs de sensations fortes. Un hommage à Odile Deray et son goût douteux.', 'Difficile', '§Prenez une belle gencive de porc, de préférence bien charnue. §Faites-la mariner dans un mélange de vin rouge, ail, oignons et herbes pendant au moins 2 heures. §Dans une cocotte, faites revenir des oignons jusqu''à ce qu''ils soient translucides. §Ajoutez la gencive marinée et faites-la dorer sur toutes ses faces. §Déglacez avec du vin rouge, puis ajoutez des carottes, des champignons et un bouquet garni. §Laissez mijoter à feu doux pendant 1h30, en remuant de temps en temps. §Pendant ce temps, préparez une purée de pommes de terre pour accompagner. §Une fois la gencive bien tendre, servez avec un peu de sauce et dégustez sous les regards horrifiés de vos convives.',
   'http://localhost:3000/images-recettes/16_normal.webp',17,2,1,TRUE); --16

-- Insertion des assignations de régimes alimentaires aux recettes
INSERT INTO "recipe_diet_assignation" (recipe_id, diet_id) VALUES
(1, 1),
(2, 5),
(3, 1),
(4, 1),
(4, 3),
(5,1),
(6,2),
(6,4),
(7,5),
(8,5),
(9,4),
(10,5),
(11,3),
(12,1),
(12,2),
(12,3),
(12,4),
(12,5),
(13,1),
(14,2),
(15,5),
(16,5);

-- Insertion des assignations d'ingrédients aux recettes (avec ingrédients courants fictifs)
INSERT INTO "ingredient" (name) VALUES
('Oignon'), ('Bœuf'), ('Carotte'), ('Vin rouge'), ('Beurre'), ('Farine'), ('Pommes'), ('Sucre'), ('Menthe'), ('Rhum'), ('Eau gazeuse'), ('Citron vert'), ('Gencive de porc'),
('Ail'), ('Champignons'), ('Bouquet garni'), ('Sel'), ('Poivre'), ('Pommes de terre'), ('Lait de vache'), ('Tomates'), ('Poivrons'), ('Courgettes'), ('Concombre'), ('Aubergines'),
('Pois chiches'), ('Lentilles'), ('Riz'), ('Pâtes'), ('Semoule'), ('Avocat'), ('Banane'), ('Fraises'), ('Miel'), ('Crème fraîche'), ('Fromage râpé'), ('Parmesan'), ('Mozzarella'),
('Gouda'), ('Roquefort'), ('Camembert'), ('Emmental'), ('Feta'), ('Beurre de cacahuète'), ('Amandes'), ('Noix de pécan'), ('Noix de cajou'), ('Pistaches'), ('Châtaignes'),
('Cacahuètes'), ('Chocolat noir'), ('Chocolat au lait'), ('Vanille'), ('Cannelle'), ('Muscade'), ('Clou de girofle'), ('Cardamome'), ('Curcuma'), ('Paprika'), ('Cumin'),
('Coriandre'), ('Origan'), ('Thym'), ('Romarin'), ('Basilic'), ('Laurier'), ('Estragon'), ('Persil'), ('Aneth'), ('Ciboulette'), ('Fenouil'), ('Lait de coco'),
('Crème de coco'), ('Huile d''olive'), ('Huile de tournesol'), ('Huile de sésame'), ('Vinaigre balsamique'), ('Vinaigre de cidre'), ('Sauce soja'), ('Sauce tomate'),
('Ketchup'), ('Moutarde'), ('Mayonnaise'), ('Tabasco'), ('Sauce piquante'), ('Worcestershire sauce'), ('Poivre noir'), ('Sel de mer'), ('Ail en poudre'), ('Gingembre'),
('Piments'), ('Pignons de pin'), ('Raisins secs'), ('Dattes'), ('Pruneaux'), ('Abricots secs'), ('Coco râpé'), ('Farine de blé'), ('Farine de maïs'), ('Farine de riz'),
('Levure chimique'), ('Bicarbonate de soude'), ('Sucre roux'), ('Sucre glace'), ('Sucre vanillé'), ('Confiture de fraise'), ('Marmelade'), ('Sirop d''érable'), ('Sirop d''agave'),
('Sirops aromatisés'), ('Gâteau de riz'), ('Compote de pommes'), ('Crêpes'), ('Pancakes'), ('Gaufres'), ('Beurre clarifié'), ('Beurre salé'), ('Beurre doux'), ('Crème de lait'),
('Lait de chèvre'), ('Lait d''amande'), ('Lait de soja'), ('Lait de riz'), ('Yaourt nature'), ('Yaourt grec'), ('Fromage blanc'), ('Ricotta'), ('Mascarpone'), ('Crème chantilly'),
('Crème Fouetté'), ('Crème anglaise'), ('Gelée de fruits'), ('Gelatine'), ('Pouding au chocolat'), ('Crème caramel'), ('Riz au lait'), ('Tapioca'), ('Chocolat blanc'), ('Gâteau au chocolat'),
('Tarte au citron'), ('Tarte aux pommes'), ('Tarte aux fruits rouges'), ('Tiramisu'), ('Macarons'), ('Mousse au chocolat'), ('Chocolat chaud'), ('Boissons gazeuses'), ('Limonade'),
('Thé vert'), ('Thé noir'), ('Café'), ('Café décaféiné'), ('Café instantané'), ('Café moulu'), ('Moka'), ('Espresso'), ('Cappuccino'), ('Latte'), ('Macchiato'), ('Caramel'), ('Lait condensé'),
('Crème de whisky'), ('Vermouth'), ('Vin blanc'), ('Vin rosé'), ('Muscadet'), ('Champagne'), ('Bière'), ('Cidre'), ('Liqueur de fruits'), ('Gin'), ('Vodka'), ('Rhum blanc'), ('Rhum ambré'),
('Tequila'), ('Whisky'), ('Bourbon'), ('Cognac'), ('Armagnac'), ('Brandy'), ('Vermouth blanc'), ('Vermouth rouge'), ('Saké'), ('Mirin'), ('Kéfir'), ('Jus de fruits'), ('Jus d''orange'),
('Jus de pomme'), ('Jus de raisin'), ('Jus de grenade'), ('Jus de carotte'), ('Jus de tomate'), ('Jus de citron'), ('Eau de coco'), ('Eau de fleur d''oranger'), ('Eau de rose'),
('Eau pétillante'), ('Eau minérale'), ('Eau de source'), ('Eau distillée'), ('Bouillon de légumes'), ('Bouillon de poule'), ('Bouillon de bœuf'), ('Bouillon de poisson'), ('Bouillon d''agneau'),
('Sauce béchamel'), ('Sauce hollandaise'), ('Sauce béarnaise'), ('Sauce au beurre blanc'), ('Sauce au vin rouge'), ('Sauce au vin blanc'), ('Sauce au curry'), ('Sauce au fromage bleu'),
('Sauce au yaourt'), ('Vinaigrette'), ('Ketchup maison'), ('Mayonnaise maison'), ('Sauce au poivre'), ('Chili'), ('Curry en poudre'), ('Poudre de curry'), ('Paprika doux'),
('Paprika fumé'), ('Curry vert'), ('Curry rouge'), ('Sauce sriracha'), ('Sauce barbecue'), ('Tzatziki'), ('Chutney'), ('Moutarde à l''ancienne'), ('Moutarde de Dijon'), ('Moutarde douce'),
('Moutarde de Meaux'), ('Moutarde en grains'), ('Tomates séchées'), ('Pesto vert'), ('Haricots verts'), ('Haricots blancs'), ('Haricots rouges'), ('Fèves'), ('Pois gourmands'), ('Pesto rouge'),
('Pois verts'), ('Cresson'), ('Chou-fleur'), ('Chou rouge'), ('Chou frisé'), ('Chou de Bruxelles'), ('Salade verte'), ('Laitue'), ('Endive'), ('Roquette'), ('Cresson de jardin'), ('Mâche'), ('Epinards'), ('Blette'),
('Oseille'), ('Artichauts'), ('Cardons'), ('Topinambours'), ('Radis'), ('Navets'), ('Poireaux'), ('Panais'), ('Fenouil doux'), ('Céleri-rave'), ('Céleri branche'), ('Betterave'),
('piment d''espellette'), ('Sel de Guérande'), ('Fleur de sel'),  ('Piments de cayenne'), ('Tumeric'), ('Lait de brebis'), ('Lait écrémé'), ('Boeuf haché'), ('Saucisses'), ('Côtelettes d''agneau'),
('Escalopes de poulet'), ('Filet de poisson'), ('Crevettes'), ('Moules'), ('Huîtres'), ('Saumon'), ('Thon en conserve'), ('Calmars'), ('Seiches'), ('Langoustines'), ('Crabe'),
('Homard'), ('Pâté de foie gras'), ('Foie de volaille'), ('Boudin noir'), ('Boudin blanc'), ('Jambon cru'), ('Jambon cuit'), ('Saucisson'), ('Chorizo'), ('Saucisses de Toulouse'),
('Merguez'), ('Grains de maïs'), ('Pois cassés'), ('Graines de tournesol'), ('Graines de chia'), ('Graines de lin'), ('Graines de sésame'), ('Graines de courge'), ('Graines de pavot'),
('Graines de cumin');

INSERT INTO "recipe_ingredient_assignation" (recipe_id, ingredient_id, quantity, unit) VALUES
(1, 1, 3, 'pièces'),
(2, 2, 500, 'g'),
(2, 3, 2, 'pièces'),
(2, 4, 250, 'ml'),
(3, 7, 4, 'pièces'),
(3, 8, 100, 'g'),
(4, 9, 10, 'feuilles'),
(4, 10, 50, 'ml'),
(4, 11, 100, 'ml'),
(4, 12, 1, 'pièce'),
(5, 50, 200, 'g'), -- Chocolat noir
(5, 5, 100, 'g'), -- Beurre
(5, 21, 100, 'g'), -- Farine
(5, 22, 3, 'pièces'), -- Oeufs
(5, 23, 100, 'g'), -- Sucre
(6, 9, 10, 'feuilles'), -- Menthe
(6, 11, 2, 'pièces'), -- Citron vert
(6, 10, 50, 'g'), -- Sucre
(6, 12, 60, 'ml'), -- Rhum
(6, 13, 100, 'ml'), -- Eau gazeuse
(7, 1, 1, 'pièce'), -- Oignon
(7, 14, 2, 'gousses'), -- Ail
(7, 24, 200, 'g'), -- Viande hachée
(7, 25, 400, 'g'), -- Sauce tomate
(7, 26, 250, 'g'), -- Pâtes
(8, 27, 2, 'pièces'), -- Oeufs
(8, 14, 1, 'gousse'), -- Ail
(8, 28, 1, 'c. à soupe'), -- Gingembre
(8, 29, 500, 'ml'), -- Bouillon
(8, 30, 100, 'g'), -- Champignons
(8, 31, 200, 'g'), -- Poulet
(9, 1, 1, 'pièce'), -- Oignon
(9, 24, 300, 'g'), -- Viande hachée
(9, 32, 1, 'c. à café'), -- Curry
(9, 33, 1, 'c. à café'), -- Curcuma
(9, 34, 50, 'g'), -- Raisins secs
(9, 35, 2, 'pièces'), -- Oeufs
(9, 36, 200, 'ml'), -- Lait
(10, 37, 1, 'pâte'), -- Pâte à pizza
(10, 25, 150, 'g'), -- Sauce tomate
(10, 38, 100, 'g'), -- Fromage râpé
(10, 39, 100, 'g'), -- Mozzarella
(10, 40, 100, 'g'), -- Garniture au choix
(11, 41, 500, 'g'), -- Poulet
(11, 42, 200, 'g'), -- Légumes variés
(11, 17, 1, 'pincée'), -- Sel
(11, 18, 1, 'pincée'), -- Poivre
(11, 36, 100, 'ml'), -- Bouillon de volaille
(12, 43, 1, 'pièce'), -- Chou
(12, 3, 2, 'pièces'), -- Carottes
(12, 19, 2, 'pièces'), -- Pommes de terre
(12, 44, 1, 'L'), -- Eau
(13, 45, 500, 'ml'), -- Lait
(13, 27, 3, 'pièces'), -- Oeufs
(13, 23, 100, 'g'), -- Sucre
(13, 46, 1, 'c. à café'), -- Vanille
(14, 47, 2, 'pavés'), -- Saumon
(14, 48, 200, 'g'), -- Poireaux
(14, 5, 50, 'g'), -- Beurre
(14, 17, 1, 'pincée'), -- Sel
(14, 18, 1, 'pincée'), -- Poivre
(15, 41, 500, 'g'), -- Poulet
(15, 1, 1, 'pièce'), -- Oignon
(15, 14, 2, 'gousses'), -- Ail
(15, 25, 200, 'g'), -- Tomates
(15, 49, 2, 'pièces'), -- Poivrons
(15, 50, 150, 'ml'), -- Vin blanc
(16, 13, 1, 'pièce'), -- Gencive de porc
(16, 4, 500, 'ml'), -- Vin rouge
(16, 1, 2, 'pièces'), -- Oignon
(16, 14, 2, 'gousses'), -- Ail
(16, 3, 2, 'pièces'), -- Carotte
(16, 15, 200, 'g'), -- Champignons
(16, 16, 1, 'pièce'), -- Bouquet garni
(16, 17, 1, 'pincée'), -- Sel
(16, 18, 1, 'pincée'), -- Poivre
(16, 19, 4, 'pièces'), -- Pommes de terre
(16, 5, 50, 'g'), -- Beurre
(16, 20, 100, 'ml'); -- Lait

COMMIT;