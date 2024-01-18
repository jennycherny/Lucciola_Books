import React, { useState } from 'react';
import './AboutTabs.css'

const AboutTabs = () => {
    const [activeTab, setActiveTab] = useState(1);

    const tabsData = [
        {
          label: 'Магазин',
          content: 
            <div>
                    <p>Предпочитаете печатные книги вместе электронных? Любите ловить запах и шуршание страниц, только приехавших из типографии? Мы тоже! Так и появилась идея магазина Lucciola Books.</p>
                <h3>✨ Какие есть книги?</h3>
                    <p>Мы стараемся поставлять в магазин самые интересные новинки и бестселлеры современной литературы. Отдельное внимание мы уделяем детским книжкам с яркими иллюстрациями.</p>
                <h3>✨ Могу ли я взять книгу из магазина почитать на время? </h3>
                    <p>К сожалению, нет. Мы заботимся о том, чтобы покупатели получали книги в нетронутом виде. Кстати, потому же мы их бережно упаковываем — так обложка выдержит любую доставку.</p>
                <h3>✨ В магазине нет книги, которую я хочу</h3>
                    <p>Тогда рекомендуем воспользоваться опцией предзаказа. Мы привезем книгу в Грузию, и вы сможете ее выкупить.</p>
            </div>
        },
        {
          label: 'Библиотека',
          content: 
            <div>
                    <p>Вечно переезжаете, негде хранить книги или не хотите захламляться? Тогда библиотека — это для вас!</p>
                <h3>✨ Какие есть книги?</h3>
                    <p>Мы предлагаем сотни книг разных жанров: от серьезной научно-популярной до легкой художественной литературы. Есть яркие книжки для малышей от нуля лет.  А если вы изучаете иностранные языки, то для вас найдутся захватывающие сюжеты на английском и итальянском языке.</p>
                <h3>✨ Сколько это стоит?</h3>
                    <p>Одна книга на месяц — 10 GEL, вторая книга в течение этого же месяца — 5 GEL. Если не хватит — можно продлить еще на две недели за 5 GEL, на месяц — за 10 GEL. 
                    <br /><br />
                     А еще есть детский абонемент, который можно взять на месяц за 10 GEL. С ним вы сможете взять до трех детских книг и порадуете себя и своего ребенка. </p>
                <h3>✨ А можно выкупить книгу из библиотеки?</h3>
                    <p>Да! К тому же, все книги из библиотеки обойдутся вам дешевле, чем новые, ведь они уже немного потрепались. Но на сюжете это точно никак не скажется! </p>
            </div>
        },
        {
          label: 'Предзаказ',
          content: <div>
                <p>Не нашли желаемую книгу? Заполните форму предзаказа, и мы привезем нужный экземпляр в течение месяца с ближайшей поставкой. Вы сможете выкупить книгу, как только она окажется в наличии.</p>
            <h3>✨ Как я узнаю, что книга в наличии?</h3>
                <p>Мы сообщим вам первым по тем контактам, которые вы оставите в форме. После того, как книга появится на сайте, вы сможете добавить ее в корзину и оформить покупку.</p>
            <h3>✨ Сколько это стоит?</h3>
                <p>Оформление предзаказа абсолютно бесплатно. Платить нужно будет только при оформлении покупки.</p>
        </div>
        },
      ];

    const handleTabClick = (index) => {
        setActiveTab(index);
    };
    
      return (
        <div className='tabs-conteiner'>
          <div className='tabs-buttons'>
            {tabsData.map((tab, index) => (
              <button
                key={index}
                onClick={() => handleTabClick(index)}
                className={index === activeTab ? 'chosen' : ''}
              >
                {tab.label}
              </button>
            ))}
          </div>
            <div className='tabs-content'>
                {tabsData[activeTab].content}
            </div>
        </div>
      );
    };    

export default AboutTabs;