import { Card, List, CardOrg, ListOrg } from "@prisma/client"

export type ListOrgWithCards = ListOrg & { cards: CardOrg[] }

export type CardOrgWithList = CardOrg & { list: ListOrg }

export type ListWithCards = List & { cards: Card[] }

export type CardWithList = Card & { list: List }

