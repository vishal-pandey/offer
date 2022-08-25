import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import jsPDF from 'jspdf';
import {Md5} from 'ts-md5/dist/md5';
import { MainService } from '../../services/main.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {style, state, animate, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity:0}),
        animate(300, style({opacity:1})) 
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(300, style({opacity:0})) 
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({marginTop:'100vh'}),
        animate(100, style({marginTop: 0})) 
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(100, style({marginTop: '-100vh'})) 
      ])
    ])
  ]
})
export class OfferComponent implements OnInit {

  @ViewChild('content', {static: false}) el!: ElementRef

  constructor(
    private fb: FormBuilder,
    public ms: MainService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if(!this.ms.isLoggedIn()) {
      window.location.href = "/login"
    }
  }

  offerId:any = null;
  loading:boolean = false;
  name:string = 'Vishal Pandey';
  isModalOpen = false;
  
  todayDate = new Date().toDateString();

  offerLetterForm: FormGroup = this.fb.group({
    name: [''],
    date: [this.todayDate],
    address: [''],
    address1: [''],
    address2: [''],
    email: [''],
    phone: [''],
    ctcAnnual: [''],
    joiningBonus: [''],
    insurance: [''],
    joiningDate: [''],

    basicSalaryAnnual: [''],
    hraSalaryAnnual: [''],
    taSalaryAnnual: [''],
    maSalaryAnnual: [''],
    communicationSalaryAnnual: [''],
    pfSalaryAnnual: [''],

    basicSalaryMonthly: [''],
    hraSalaryMonthly: [''],
    taSalaryMonthly: [''],
    maSalaryMonthly: [''],
    communicationSalaryMonthly: [''],
    pfSalaryMonthly: [''],

    totalSalaryAnnual: [''],
    totalSalaryMonthly: [''],
    grandTotalSalary: [''],
    _id: ['']
  })

  sendMailForm: FormGroup = this.fb.group({
    employeeEmail: [''],
    ccEmails: [''],
    _id: ['']
  })

  ngOnInit(): void {

    this.offerId = this.route.snapshot.paramMap.get('id');
    if(this.offerId) {
      this.loading = true;
      console.log(this.offerId)
      this.ms.getOffers(this.offerId).subscribe((data:any) => {
        console.log(data);
        if(data.success) {
          let theData = data.result[0];
          this.offerLetterForm.patchValue(theData)
          this.loading = false;
        }
      })
    }

    this.offerLetterForm.get('ctcAnnual')?.valueChanges.subscribe((val) => {
      let ctcAnnual = parseInt(val)
      let ctcMontly = ctcAnnual/12
      
      this.offerLetterForm.get('totalSalaryAnnual')?.setValue(ctcAnnual)
      this.offerLetterForm.get('grandTotalSalary')?.setValue(ctcAnnual)
      this.offerLetterForm.get('totalSalaryMonthly')?.setValue(ctcMontly)

      this.offerLetterForm.get('basicSalaryAnnual')?.setValue(ctcAnnual * 0.6)
      this.offerLetterForm.get('basicSalaryMonthly')?.setValue(ctcMontly * 0.6)

      this.offerLetterForm.get('hraSalaryAnnual')?.setValue(ctcAnnual * 0.3)
      this.offerLetterForm.get('hraSalaryMonthly')?.setValue(ctcMontly * 0.3)

      this.offerLetterForm.get('taSalaryAnnual')?.setValue(ctcAnnual * 0.01)
      this.offerLetterForm.get('taSalaryMonthly')?.setValue(ctcMontly * 0.01)

      this.offerLetterForm.get('maSalaryAnnual')?.setValue(ctcAnnual * 0.008)
      this.offerLetterForm.get('maSalaryMonthly')?.setValue(ctcMontly * 0.008)

      this.offerLetterForm.get('communicationSalaryAnnual')?.setValue(ctcAnnual * 0.069)
      this.offerLetterForm.get('communicationSalaryMonthly')?.setValue(ctcMontly * 0.069)

      this.offerLetterForm.get('pfSalaryAnnual')?.setValue(ctcAnnual * 0.012)
      this.offerLetterForm.get('pfSalaryMonthly')?.setValue(ctcMontly * 0.012)

      

    })
  }

  
  inWords (num: any) {
      let a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
      let b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
      if ((num = num.toString()).length > 9) return 'overflow';
      let n:any = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
      if (!n) return; var str = '';
      str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
      str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
      str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
      str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
      str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
      return str;
  }

  addWaterMark(doc:any) {
    var totalPages = doc.internal.getNumberOfPages();
  
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      //doc.addImage(imgData, 'PNG', 40, 40, 75, 75);
      doc.setTextColor(150);
      doc.text(50, doc.internal.pageSize.height - 30, '');
    }
  
    return doc;
  }

  async downloadPDF() {
    this.el.nativeElement.style = "height: auto; background-color: white; border-left: none; font-size: 10px; width: 530px; padding: 0px;";

    let pdf = new jsPDF("p", "pt", "a4");

    pdf.html(this.el.nativeElement, {
      margin: [20, 0, 20 ,30],
      callback: (pdf) =>{
        pdf = this.addWaterMark(pdf);
        pdf.save('sample.pdf')
        this.el.nativeElement.style = "";
      }
    });

    // Saving Data to DB
    let data = this.offerLetterForm.value;
    let location = window.location.href
    data['location'] = location
    if(data["_id"] == ""){
      delete data._id
    }
    this.ms.saveData(data).subscribe((res:any) => {
      if(res.success) {
        let offerId = res.result.insertedId
        this.offerLetterForm.get('_id')?.setValue(offerId);
      }
    });
  }

  openModal() {
    let employeeEmail = this.offerLetterForm.get("email")?.value
    this.sendMailForm.get("employeeEmail")?.setValue(employeeEmail)
    this.isModalOpen = true
  }

  closeModal() {
    this.isModalOpen = false;
  }

  

}
