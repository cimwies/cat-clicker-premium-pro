
/* DATA MODELL the cats object - all possible cat are listed in here */

let model = {

    currenCat: null,

    adminShow: false, //hides the admin display area.

    cats: [
        {
          catName: 'katze1',
          catImg:'img/cat1.jpg',
          clickCounter: 0
        },
        {
          catName: 'katze2',
          catImg: 'img/cat2.jpg',
          clickCounter: 0
        },
        {
          catName: 'katze3',
          catImg: 'img/cat3.jpg',
          clickCounter: 0
        },
        {
          catName: 'katze4',
          catImg: 'img/cat4.jpg',
          clickCounter: 0
        },
        {
          catName: 'katze5',
          catImg: 'img/cat5.jpg',
          clickCounter: 0
        }
    ]

};



/* OCTOPUS PART */

let octopus = {

    init: function() {

        model.currentCat = model.cats[0];

        singleView.init();
        listView.init();
        adminView.init();
        adminView.hide();

    },


    getCurrentCat: function() {

       return model.currentCat;
    
    },


    getCats: function() {

        return model.cats;
    
    },


    // set the currently-selected cat to the object passed in
    setCurrentCat: function(cat) {

        model.currentCat = cat;

    },


    catClickCounter: function() {

        model.currentCat.clickCounter++;
        singleView.render();
        adminView.render();

    },


    adminDisplay: function() {
           
        if (model.adminShow === false) {
            model.adminShow = true;
            adminView.show(); //displays the admin input boxes and buttons
        }

        else if (model.adminShow === true) {
            model.adminShow = false;
            adminView.hide();// hides the admin input boxes and buttons
        }

    },


    adminClear: function() {

        model.adminShow = false;
        adminView.hide();

    },


      //hides admin display and saves new cat data when save button is clicked.
    adminSave: function() {


        model.currentCat.catName = adminView.catNameValue.value;
        model.currentCat.catImg = adminView.catImgValue.value;
        model.currentCat.clickCounter = adminView.clickCounterValue.value;
        singleView.render();
        listView.render();

        model.adminShow = false;
        adminView.hide();

    }



};



/* VIEW MODELL */

let singleView = {

    init: function() {
        // store pointers to our DOM elements for easy access later

        //section main - single view of clicked cat

        this.catName = document.getElementById('catname');
        this.catImg = document.getElementById('catimage');
        this.clickCounter = document.getElementById('counter');

        this.catImg.addEventListener('click', function() {
          
            octopus.catClickCounter();

        });

        this.render();

    },

      render: function() {

        let currentCat = octopus.getCurrentCat();

        this.catName.textContent = currentCat.catName; // http://kellegous.com/j/2013/02/27/innertext-vs-textcontent/
        this.catImg.setAttribute('src', currentCat.catImg);
        this.catImg.setAttribute('alt', currentCat.catName);
        this.clickCounter.textContent = 'the cat got clicked ' + currentCat.clickCounter + ' times';
    
    }

};



let listView = {

    init: function() {

        // store pointers to our DOM elements for easy access later

        //section aside - list of all cats

        this.ul = document.getElementById('ul');
        // won't work if we generate the list fresh from cat object this.item = document.getElementsByClassName('item');
        //this.catItem = document.getElementsByClassName('catitem');

        this.render();

    },


    render: function() {


        let cats = octopus.getCats();

        // empty the cat list WARUM? TESTEN
        this.ul.innerHTML = '';

        for (let i = 0; i < cats.length; i++) {   

            let cat = cats[i];

            const li = document.createElement('li');
            
            const img = document.createElement('img');
            img.setAttribute('src', cat.catImg);
            img.setAttribute('alt', cat.catName);



            img.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    singleView.render();

                };

            })(cat));

            li.appendChild(img);

            this.ul.appendChild(li);

        }


    }


};



let adminView = {

    init: function() {

        this.catNameValue = document.getElementById('catNameValue');
        this.catImgValue = document.getElementById('catImgValue');
        this.clickCounterValue = document.getElementById('clickCounterValue');


        this.adminButton = document.getElementById('adminbutton');
        this.clearButton = document.getElementById('clearbutton');
        this.cancelButton = document.getElementById('cancel');
        this.saveButton = document.getElementById('save');


        this.adminButton.addEventListener('click', function() {

              octopus.adminDisplay();

        });


        this.cancelButton.addEventListener('click', function() {

              octopus.adminClear();

        });


        this.saveButton.addEventListener('click', function() {

             octopus.adminSave();

        });


        this.render();
              

    },


    render: function() {

        let currentCat = octopus.getCurrentCat();

        this.catNameValue.value = currentCat.catName;
        this.catImgValue.value = currentCat.catImg;
        this.clickCounterValue.value = currentCat.clickCounter;

    },


    show: function() {
    
        const adminpanel = document.querySelector('.adminpanel');
        this.adminButton.style.display = 'none';
        adminpanel.style.display = 'block'; //shows the admin div on index.html
        this.cancelButton.style.display = 'block';
        this.saveButton.style.display = 'block';
    
    },
        
    
    hide: function() {

        const adminpanel = document.querySelector('.adminpanel');
        this.adminButton.style.display = 'block';
        adminpanel.style.display = 'none';
        this.cancelButton.style.display = 'none';
        this.saveButton.style.display = 'none';
    
    }


};



/* activate things */

octopus.init();


