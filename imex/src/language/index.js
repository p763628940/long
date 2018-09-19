import Vue from "vue";
import VueI18n from 'vue-i18n';
import zh from "./zh";
import en from "./en";
import ko from "./kr";
Vue.use(VueI18n);


const messages = {
  zh,
  en,
  ko
}

export default function (lang){

  return  new VueI18n({
    locale: lang,
    messages
  })
};



