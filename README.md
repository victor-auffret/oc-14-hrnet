# HRNet PROJETS REACT + JQUERY 

## CHOIX TECHNIQUES 

- monorepo pour lancer facilement le projet jquery + react 
- workspace pour projets (react app, jquery app)
- dossier "hide" avec les ressources du projet pour travailler hors ligne 
- input type date pour la date afin de réduire la dette technique 
- alert pour la modale en attendant d'avoir une vrai modale puis modale react 
- typescript react
- utilisation d'un context pour retirer la dépendance vers le storage 
- ajout du logo en favicon
- lancement du projet jquery via live-server

pour lancer la version classique en jquery pure : 
```bash
npm run dev:jquery
```

pour lancer la version react du projet : 
```bash
npm run dev:react
```

pour installer le pluggin dans le workspace correspondant 
```bash
npm install --save git+https://github.com/victor-auffret/oc-14-hrnet-plugin-react-table.git#main -w ./packages/hrnet-react
```
