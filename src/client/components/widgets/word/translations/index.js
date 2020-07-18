import it from "./it";
import da from "./da";
import de from "./de";
import es from "./es";
import fr from "./fr";
import ja from "./ja";
import ko from "./ko";
import nl from "./nl";
import pl from "./pl";
import pt from "./pt";
import ru from "./ru";
import zh from "./zh";
import zh_tw from "./zh_tw";

const { default: en } = require("./en");

const translationsMap = {
    da: da,
    de: de,
    en: en,
    es: es,
    fr: fr,
    it: it,
    ja: ja,
    ko: ko,
    nl: nl,
    pl: pl,
    pt: pt,
    ru: ru,
    zh: zh,
    zh_tw: zh_tw
}

export default translationsMap