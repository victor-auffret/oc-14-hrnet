<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">REACT HRNET</h3>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table des matières</summary>
  <ol>
    <li>
      <a href="#a-propos-du-projet">A propos du projet</a>
      <ul>
        <li><a href="#créé-avec">Créé avec</a></li>
      </ul>
    </li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#utilisation">Utilisation</a></li>
    <li><a href="#choix-technique">Choix technique</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## A propos du projet

[![HRnet-react][hrnet-logo]](https://github.com/victor-auffret/oc-14-hrnet/tree/main/packages/hrnet-react)

Dans le cadre d'un projet, on m'a demandé de supprimer la dépendance de Jquery pour migrer le projet vers React.

Ce projet comporte 3 composant très particulier issu d'une transition jquery vers réact : 
* Le composant Modale qui est une simple modale 
* Le composant DataTable qui est une dépendance de ce projet sous forme de plugin
* Le composant SelectState qui est une select list stylisée 

Dans le projet d'origine, Jquery utilisait un plugin pour le formulaire de date mais celui ci a été remplacé par l'input de type date natif.

<p align="right">(<a href="#readme-top">haut de page</a>)</p>


### Créé avec 

Cette section parle de dépendances du projet

* [![React][React.js]][React-url]
* [React Router](https://reactrouter.com/en/main)

<p align="right">(<a href="#readme-top">haut de page</a>)</p>



<!-- GETTING STARTED -->


### Installation

Pour installer ce projet il suffit de le fork pour bien de télécharger l'archive zip.
Il faut tout de même préciser que le projet contient à la fois la version JQuery et la version React afin de pouvoir comparer les deux.

<p align="right">(<a href="#readme-top">haut de page</a>)</p>


<!-- USAGE EXAMPLES -->
## Utilisation

Je vais détailler le fonctionnement des composant Modale et SelectState.

La modale possède 3 éléments dans props : 
* children?: le texte contenu dans la modale
* hidden: boolean qui détermine si la modale est cachée ou visible
* setHidden: la fonction qui controle le booleen hidden afin de pouvoir piloter l'affichage depuis le composant parent


```tsx
import { useCallback, useState } from 'react';
// import du composant
import { ModaleComponent } from '../../components/modale';
// import moche du css 

const ComposantReact = () => {

  // on créé le state et la fonction pour afficher / cacher la modale dans le parent
  const [hide, setHide] = useState(true)

  // on ajoute une petite fonction pour ouvrir la modale
  const openModale = useCallback(() => {
    setHide(false)
  }, [])

  // on affiche le composant
  return (<div>
    <button onClick={openModale}>afficher la modale</button>
    <ModaleComponent hidden={hide} setHidden={setHide}>
      Ici le texte de la modale
    </ModaleComponent>
  </div>);
}

export { ComposantReact }
```

Le composant SelectState lui s'utilise de cette façon : 

```tsx
import { useCallback, useRef } from 'react';
// import du composant
import { SelectStateComponent } from '../../components/select-state';
// import moche du css 

const ComposantReact = () => {

  // on créé l'id du select
  const nameId = "pays"

  // on créé la liste des éléments du Select
  const listElem = useMemo(() => {
    return [
      { value: "CHI", text: "Chine" },
      { value: "FRA", text: "France" },
      { value: "IND", text: "Inde" },
      { value: "USA", text: "Etats Unis" }
    ]
  }, [])

  // on créer une référence vers un élément de type HTMLSelectElement
  const paysRef = useRef<HTMLSelectElement>(null)

  const handleSubmit = useCallback(() => {
    console.log(`pays : ${paysRef.current?.value}`)
  }, [])

  // on affiche le composant
  return (<form>
     <label htmlFor={nameId}>Choisir un pays : </label>
     <SelectStateComponent nameId={nameId} listElements={listElem} childRef={paysRef} />

     <button onClick={handleSubmit}>ENVOYER</button>
  </form>);
}

export { ComposantReact }
```

Le composant utilise 3 propriétés : 
* nameId : correspond à l'id de l'élément select
* listElements : un tableau d'objet contenant à la fois le texte et la valeur de l'option
* childRef : une référence pour l'élément select dont on peut récupérer la valeur depuis le parent

<p align="right">(<a href="#readme-top">haut de page</a>)</p>

<!-- CHOIX TECHNIQUE -->
## Choix technique

Pour ce projet, j'ai commencé par utiliser react-router pour le routage de l'application.

J'ai ensuite remplacer la modale par un alert et le plugin jquery de l'élément date par un input de type date natif.

J'ai gardé dans un premier temps un select classique non stylisé pour faire fonctionner la page home.

Je me suis concentré sur l'élément data-table que j'ai ensuite sorti du projet pour l'intégré en tant que dépendance.

J'ai conservé pendant un long moment le système d'enregistrement via le localStorage, je n'ai fais la transition vers un context react que tardivement ce qui m'a permi de tester l'application en conservant les données d'une session à l'autre.

<p align="right">(<a href="#readme-top">haut de page</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">haut de page</a>)</p>


<!-- CONTACT -->
## Contact

<!-- Your Name - [@your_twitter](https://twitter.com/your_username) - email@example.com -->

Lien du projet: [https://github.com/victor-auffret/oc-14-hrnet](https://github.com/victor-auffret/oc-14-hrnet)

<p align="right">(<a href="#readme-top">haut de page</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/victor-auffret/oc-14-hrnet-plugin-react-table.svg?style=for-the-badge
[contributors-url]: https://github.com/victor-auffret/oc-14-hrnet-plugin-react-table/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/victor-auffret/oc-14-hrnet-plugin-react-table.svg?style=for-the-badge
[forks-url]: https://github.com/victor-auffret/oc-14-hrnet-plugin-react-table/network/members
[stars-shield]: https://img.shields.io/github/stars/victor-auffret/oc-14-hrnet-plugin-react-table.svg?style=for-the-badge
[stars-url]: https://github.com/victor-auffret/oc-14-hrnet-plugin-react-table/stargazers
[issues-shield]: https://img.shields.io/github/issues/victor-auffret/oc-14-hrnet-plugin-react-table.svg?style=for-the-badge
[issues-url]: https://github.com/victor-auffret/oc-14-hrnet-plugin-react-table/issues
[license-shield]: https://img.shields.io/github/license/victor-auffret/oc-14-hrnet-plugin-react-table.svg?style=for-the-badge
[license-url]: https://github.com/victor-auffret/oc-14-hrnet-plugin-react-table/blob/master/LICENSE
[hrnet-logo]: public/ms-icon-310x310.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
