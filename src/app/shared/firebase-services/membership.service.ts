import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, collectionData, query, where, limit, orderBy, onSnapshot, addDoc, getDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Membership } from '../models/membership.class';

@Injectable({
    providedIn: 'root'
})

export class MembershipService {
    private userMembershipsSubject = new BehaviorSubject<Membership[]>([]);
    public userMemberships$ = this.userMembershipsSubject.asObservable();

    private channelMembershipsSubject = new BehaviorSubject<Membership[]>([]);
    public channelMemberships$ = this.channelMembershipsSubject.asObservable();

    firestore: Firestore = inject(Firestore);

    constructor() { }

    async addMembership(membership: Membership) {
        try {
            const docRef = await addDoc(collection(this.firestore, "memberships"), membership.toJSON());
            console.log(docRef.id);
            return docRef.id;
        } catch (err) {
            console.error(err);
            return err;
        }
    }

    async updateMembership(membership: Membership) {
        if (membership.id) {
            const docRef = doc(collection(this.firestore, 'memberships'), membership.id);
            await updateDoc(docRef, membership.toJSON()).catch(console.error);
        }
    }

    async deleteMembership(membership: Membership) {
        await deleteDoc(doc(collection(this.firestore, 'memberships'), membership.id)).catch(
            (err) => { console.log(err); }
        )
    }

    getUserMemberships(userID: string) {
        const q = query(collection(this.firestore, 'memberships'), where("userID", "==", userID));
        onSnapshot(q, (snapshot) => {
            const memberships = snapshot.docs.map(doc => Membership.fromFirestore({id: doc.id, data: () => doc.data()}));
            this.userMembershipsSubject.next(memberships);
        });
    }

    getChannelMemberships(channelID: string) {
        const q = query(collection(this.firestore, 'memberships'), where("channelID", "==", channelID));
        onSnapshot(q, (snapshot) => {
            const memberships = snapshot.docs.map(doc => Membership.fromFirestore({id: doc.id, data: () => doc.data()}));
            this.channelMembershipsSubject.next(memberships);
        });
    }
}