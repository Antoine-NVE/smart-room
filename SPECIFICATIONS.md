# Contexte et objectif

L’entreprise **XXX** souhaite informatiser le suivi et la réservation de ses salles de réunion afin de :

* Connaître rapidement les disponibilités des salles.
* Faciliter et accélérer le processus de réservation.
* Améliorer la traçabilité et le suivi des réservations.
* Disposer d’une vision d’ensemble du taux d’utilisation et des équipements associés.

L’application **SmartRoom** a pour objectif de centraliser la gestion des salles (consultation, réservation, suivi, signalement et statistiques) dans un outil unique, ergonomique et accessible à tous les collaborateurs.

---

# Problématiques rencontrées

* Nécessité d’améliorer la rapidité de réservation des salles.
* Besoin de traçabilité des réservations des salles.
* Besoin d’une vision d’ensemble des réservations des salles.

---

# Objectifs de l’application

L’application doit permettre :

* De consulter les disponibilités et caractéristiques des salles (nom/numéro, bâtiment, étage, équipements).
* De réserver une salle pour un créneau simple ou récurrent.
* De gérer et modifier les réservations existantes.
* D’être notifié automatiquement des confirmations, modifications ou annulations.
* De signaler un problème ou un dommage sur un équipement d’une salle.
* De consulter les statistiques sur le taux d’occupation et d’utilisation des salles (réservé à l’administrateur).

---

# Périmètre fonctionnel

## 1. Réservation

* Réservation simple ou récurrente.
* Choix des critères : date, heure, durée, capacité, équipements, bâtiment, étage.
* Visualisation du planning (vue calendrier, planning ou liste).
* Seul le réservataire et l’administrateur peuvent modifier ou annuler une réservation.
* Possibilité de voir, pour une salle réservée, le nom et l’adresse mail du réservataire.

---

## 2. Gestion des disponibilités

* L’administrateur peut rendre une salle indisponible (ex : travaux, maintenance) sur une période donnée.
Il doit confirmer la disponibilité de la salle pour que de nouvelles réservations puissent avoir lieu.
* Si une salle est rendue indisponible alors qu’elle est déjà réservée :

  * Les réservations concernées sont automatiquement annulées.
  * Le ou les réservataires concernés reçoivent une notification par mail précisant la date d’indisponibilité.

---

## 3. Signalement d’incident

* Bouton **“Signaler un problème”** disponible sur chaque fiche salle.
* Champ texte libre pour décrire le dommage constaté (mobilier, matériel, clim, etc.).
* L’administrateur est notifié par e-mail et via une section **“Alertes”** sur son tableau de bord.
* L’administrateur peut marquer les signalements comme **traités** ou **en cours**.

---

## 4. Gestion des favoris

* Chaque utilisateur peut ajouter ou supprimer une salle de ses favoris, directement depuis la page de la salle.

---

## 5. Historique et suivi

* Historique des réservations accessible au réservataire (consultation, modification, annulation).
* Historique complet des salles et réservations pour l’administrateur.

---

## 6. Statistiques et reporting (administrateur)

* Taux d’occupation global et par salle.
* Nombre total de réservations par période.
* Périodes de forte utilisation.

---

## 7. Gestion des droits et rôles

| Rôle                                | Accès et actions autorisées                                                                                                                                                                                                |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Utilisateur non connecté            | Peut consulter la liste des salles, leurs équipements et disponibilités, mais ne peut pas réserver.                                                                                                                        |
| Utilisateur connecté (réservataire) | Peut rechercher, réserver, modifier ou annuler ses propres réservations. Peut signaler un problème et ajouter des favoris.                                                                                                 |
| Administrateur                      | Tous les droits : création, modification et suppression de salles, gestion des ressources, traitement des signalements, mise en indisponibilité des salles, consultation des statistiques et supervision des réservations. |

---

## 8. Gestion des salles et ressources

Chaque salle possède les informations suivantes :
* Nom et/ou numéro de la salle.
* Localisation : bâtiment + étage.
* Capacité d’accueil (nombre de personnes).
* Ressources associées : tables, chaises, matériel audiovisuel, climatisation, surface, etc.
* Disponibilité (occupée, libre, ou indisponible pour travaux).


L’administrateur peut :
* Créer, modifier ou supprimer une salle.
* Modifier ses caractéristiques et ressources associées.
* Mettre une salle en indisponibilité temporaire.

---

## 9. Notifications automatiques

L’application envoie des notifications par e-mail dans les cas suivants :

* Confirmation d’une réservation.
* Modification d’une réservation.
* Annulation d’une réservation.
* Indisponibilité d’une salle (avec dates concernées).
* Signalement d’un problème transmis à l’administrateur.

> Seul le réservataire est notifié pour les événements concernant sa réservation.

---

# Interface et ergonomie

* Interface intuitive, responsive et adaptée aux terminaux mobiles.
* Tableau de bord administrateur regroupant :

  * Liste des salles.
  * Réservations en cours et à venir.
  * Section **“Alertes et signalements”**.
  * Accès aux statistiques et rapports.

Vue utilisateur :

* Moteur de recherche de salle (filtrage par bâtiment, étage, capacité, équipements).
* Accès rapide aux favoris et à l’historique personnel (réservations passées et futures).

---

# Sécurité et authentification

* Accès sécurisé via authentification (identifiant + mot de passe).
* Gestion des sessions et droits d’accès par rôle.
* L’utilisateur non connecté a un accès limité en lecture seule.

---

# Évolutivité

Le système doit permettre à terme :

* L’intégration d’un module d’analyse prédictive (prévision de taux d’occupation).
* Une fonctionnalité de plan interactif.