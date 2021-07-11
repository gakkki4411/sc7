'use strict';

/**

 　【課題を進めるにあたって】

        今回の課題はやることが多いので、人によって思いつく実装方法が大きく変わってくると思います。
        pdfに書いてある指示はあくまで実装の一例なので、自分で実装方法が思いついた人はすでに書いてあるプログラムを消して、自分で進めてもらっても大丈夫です！

        課題の指示ではsetTimeoutを指定していますが、setIntervalを使った実装もできます。
        思いついた人は試してみてください

*/

class mole {
    /**
     * クラスのコンストラクタ
     * クラスのインスタンスを生成するときに一回だけ呼ばれる
     *
     * @param {*} dom_mole モグラのHTMLエレメント
     */
    constructor(dom_mole){
        this.dom_mole = dom_mole;
        console.log(this.dom_mole + " : moleクラスのインスタンスが生成されました!");

        this.timer = setTimeout(function(){}, 10000);
        this.nextAct = this.spawn;

        this.spawn();
    }

    /**
     * このメソッドを呼び出せばインスタンスが持つHTMLエレメントを参照できるよ
     */
    get getDOM(){
        return this.dom_mole;
    }

    /**
     * モグラのHTMLエレメントを表示する
     *
     * 課題2
     * spawnメソッドにモグラのHTMLエレメントを表示するプログラムを追加する。
     */


    spawn(){
        //ここにモグラのhtml要素を表示にするプログラムを追加
        //第五回目課題を参考にしてみよう
      this.dom_mole.style.visibility = "visible";

        this.nextAct = this.despawn;
        this.slot();
    }

    /**
     * モグラのHTMLエレメントを非表示にする
     *
     * 課題2
     * spawnメソッドにモグラのHTMLエレメントを非表示するプログラムを追加する。
     */
    despawn(){
        //ここにモグラのhtml要素を非表示にするプログラムを追加
        //第五回目課題を参考にしてみよう
        this.dom_mole.style.visibility = "hidden";

        this.nextAct = this.spawn;
        this.slot();
    }

    /**
     *  モグラを出現させる判定を行うメソッド
     *
     * 【課題3】
　　　*  もぐらを再出現させるようにする。このメソッドに追加で記述していってください.
     *  まず一定確率以上のときとそうでないときに場合分けする。
     *
     *  真のとき：
     *  コールバック関数はslot関数内で定義したnextAct変数を与えたsetTimeoutを書く
     *
     *  偽のとき：
     *  もう一度、出現させる判定を行う。
     *
     */
    slot(){
        const me = this;
        const nextAct = function(){
            me.nextAct();
        }
        const slot = function(){
            me.slot();
        }
        clearTimeout(this.timer);
        if(Math.random() > 0.5){
            //nextActをコールバック関数に与えたタイマーを登録
            this.timer = setTimeout(nextAct, 1000*(Math.random()+1));
        }else{
            //slotをコールバック関数に与えたタイマーを登録
            this.timer = setTimeout(slot, 1000*(Math).random()+1);
        }


    }

    /**
     * クリックされたときに呼び出される関数
     * モグラのhtml要素を非表示にする
     */
    defeated(){
        this.despawn();
    }
}

/**
 * 課題1
 * もぐらをインスタンス化して叩けるようにしよう！
 *
 * 1. HTMLのクラス属性「mole」を指定して要素を取得し、「dom_moles」に格納する。
 * 　   ヒント：document.getElementsByClassName("mole")で取得できる
 *
 * 2. インスタンス化したオブジェクトを格納するための変数「moles」を用意する。
 *
 * 3. dom_molesの要素をfor文を参照し、それを引数に与えてmoleクラスをインスタンス化する。インスタンス化したオブジェクトはmolesに格納する。
 *
 *　    ヒント：クラスのインスタンス化は new mole(dom_moles[index]) でできるよ
 * 4. molesの要素をfor文を参照し、クリックイベントを作成する。イベントとなるコールバック関数はmoleクラスの関数を呼び出す。
 *
 */
 const dom_moles = document.getElementsByClassName("mole");
 const moles = [];
 for(let i =0; i<dom_moles.length; i++){
   moles[i] = new mole(dom_moles[i]);
 }

 for(const mole of moles){
   mole.getDOM.addEventListener('click',function () {
      mole.defeated();
   });
 }
