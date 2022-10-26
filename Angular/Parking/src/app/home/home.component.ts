import { Component, Injectable, OnInit } from '@angular/core';
// import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { Database, set, ref, getDatabase, get, child, onValue, off, push, remove, update, runTransaction } from "@angular/fire/database";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  data: any
  showInput: boolean = false
  showSlot: boolean = true
  dataKey: any
  status: any
  slot: Number | undefined
  
  // itemRef: AngularFireObject<any>;
  // item: Observable<any>;
  constructor(db: Database) {
    // booked : "bg-danger"
    // available : "bg-success"
    // occupied : "bg-light"

    // set(ref(db, 'parkingdata/'), {
    //   Parking1: "bg-success",
    //   Parking2: "bg-success",
    //   Parking3: "bg-success",
    //   Parking4: "bg-success",
    //   Parking5: "bg-success",
    //   Parking6: "bg-danger",
    // });

    // Data
    //  parkingdataNew
    //     slot1
    //        carnum : "AB1234"
    //        cost : 10
    //        status : "bg-danger"
    //        time : "Tue Oct 25 2022 03:21:48 GMT+0530 (India Standard Time)"
    //        username : "Rahul"
    const starCountRef = ref(db, 'parkingdata');
    onValue(starCountRef, (snapshot) => {
      this.data = snapshot.val()
      console.log(this.data)
    })



    //   for (let i = 1; i < 6; i++) {
    //     const starCountRef = ref(db, 'parkingdataNew/slot'+i);
    //     onValue(starCountRef, (snapshot) => {
    //       this.data = snapshot.val()
    //       console.log(this.data);
    //       console.log(typeof(this.data))
    //       Object.assign(this.status, { status: this.data.status });
    //       this.status = this.data.status
    //       console.log(this.status)
    //       console.log(typeof(this.status))
    //     });
    //   }
    //   console.log(this.status)
    // }


    // constructor(db: AngularFireDatabase) {
    //   this.itemRef = db.object('item');
    //   this.item = this.itemRef.valueChanges();
    //   console.log(this.item);
    // }
  }
  book(status: String, slot: any) {
    this.status = status
    this.slot = slot
    console.log(slot);
    console.log(typeof (slot));
    console.log(this.slot);
    console.log(typeof (this.slot));
    // Booked state
    if (status == "bg-danger") {
      alert("Parking Slot is already booked");
    }
    // Available state
    if (status == "bg-success") {
      this.showSlot = false
      this.showInput = true
    }
    // Occupied state
    if (status == "bg-light") {
      alert("Parking Slot is already occupied");
    }
    console.log(status);

  }

  savUserdata(user: String, carnum: String) {
    set(ref(getDatabase(), 'parkingdataBooked/slot'+ this.slot), {
      username: user,
      slot: this.slot,
      carnum: carnum,
      status: "bg-light",
      cost: 10,
      time: Date().toString(),
    })
    // .then(() => {
    //   // Data saved successfully!
    //   this.showInput = false
    //   this.showSlot = true
    //   console.log("Data saved successfully!");
    //   alert("Booking successfully!");
      
    // }).catch((error) => {
    //   // The write failed...
    //   this.showInput = false
    //   this.showSlot = true
    //   console.log("The write failed...");
    //   alert("The Booking failed...");
    // })
    if (this.slot == 1) {
      set(ref(getDatabase(), 'parkingdata/Parking1'), "bg-light");
    }
    if (this.slot == 2) {
      set(ref(getDatabase(), 'parkingdata/Parking2'), "bg-light");
    }
    if (this.slot == 3) {
      set(ref(getDatabase(), 'parkingdata/Parking3'), "bg-light");
    }
    if (this.slot == 4) {
      set(ref(getDatabase(), 'parkingdata/Parking4'), "bg-light");
    }
    if (this.slot == 5) {
      set(ref(getDatabase(), 'parkingdata/Parking5'), "bg-light");
    }
    if (this.slot == 6) {
      set(ref(getDatabase(), 'parkingdata/Parking6'), "bg-light");
    }
      this.showInput = false
      this.showSlot = true
      console.log("Data saved successfully!");
      alert("Booking successfully!");
  }


  save(username: String, carnum: String) {
    console.log(username, carnum);
    set(ref(getDatabase(), 'parkingdata/' + carnum), {
      username: username,
      carnum: carnum,
      cost: 10,
      time: Date().toString(),
    });
  }
  // update(newSize: string) {
  //   this.itemRef.update({ size: newSize });
  // }
  // delete() {
  //   this.itemRef.remove();
  // }

  ngOnInit() { }

}
