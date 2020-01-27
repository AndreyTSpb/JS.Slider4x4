function slider4x4(params){
    let slider_place = document.getElementById(params.idSlider);
    
    if(slider_place == null) return false;

    /**
     * Создаем картинки на странице
     */
    createSlider4x4(params);

    function createSlider4x4(params){
        let div_body = document.createElement('div');
        
        slider_place.appendChild(div_body);
        div_body.classList.add(params.classDivBody);

         /**
         * Заполнения картинками
         */
        params.imgs_name.forEach((img_name)=>{
            let divImg  = document.createElement('div'),
                img = document.createElement('img');
            /**
             * Картинки
             */

            params.classDivImgs.map(item=>divImg.classList.add(item));
            divImg.classList.add("img");
            img.src = params.img_folder+"/"+img_name;
            img.classList.add(params.img_class);
            divImg.appendChild(img);

            div_body.appendChild(divImg);
        }); 

    }

    /**
     * Проверяем есть лт что внутри блока для слайдера ( вдруг функция не отработала)
     */
    if(slider_place.innerHTML.trim() !== ""){
        
        let time_start = params.sec * 1000,
            indexShow  = +params.indexShow,
            col        = +params.col,
            row        = +params.row,
            imgs_div   = slider_place.querySelectorAll('.img');

        function showImg(index, nextIndex){
            /**
             * Проверка на первый
             */
            if(indexShow > imgs_div.length){
                indexShow = 1;
                nextIndex = indexShow + col*row;
                index = indexShow;
            }else{
                indexShow = indexShow + col*row;
            }

            /* Скрываем картинки и удаляем класс актив у индикаторов*/
            imgs_div.forEach((img)=>img.style.display = "none");

            /* Показываем картинки начиная с index по  nextIndex*/
            for(let i = index; i < nextIndex; i++){
                imgs_div[i-1].style.display = "block";
            }
        }

        /**
         * первый запуск
         */
        showImg(indexShow, indexShow + col*row);
        /**
         * Прокрутка слайдера с задержкой sec *1000
         */
        setInterval(()=>{
            showImg(indexShow, indexShow + col*row);
        }, time_start); // устанавливаем интервал перелистывания в милисекундах

    }else{
        let divAlert = document.createElement("div");
        divAlert.classList.add('bg-alert');
        divAlert.textContent = "No DATA";
        slider_place.appendChild(divAlert);
    }
    
}
