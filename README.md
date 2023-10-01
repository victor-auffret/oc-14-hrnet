# Hrnet

## CHOIX TECHNIQUES 

- monorepo 
- workspace pour projets (react app, jquery app)
- dossier "hide" avec les ressources du projet pour travailler hors ligne 
- storybook pour générer la documentation 
- input type date pour la date
- alert pour la modale en attendant d'avoir une vrai modale
- typescript react

pour installer le pluggin
```bash
npm install --save git+https://github.com/victor-auffret/oc-14-hrnet-plugin-react-table.git#main -w ./packages/hrnet-react
```

ensuite il faut ajouter le fichier css (je n'ai pas trouvé comment faire fonctionner de façon plus propre)
```js
import "../../../../../node_modules/oc-14-hrnet-plugin-react-table/dist/style.css"; 
```
