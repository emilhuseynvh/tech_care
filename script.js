let patients = [];
let myChart = null;
const base64Credentials = btoa("coalition:skills-test");

fetch("https://fedskillstest.coalitiontechnologies.workers.dev", {
  method: "GET",
  headers: {
    Authorization: `Basic ${base64Credentials}`,
    "Content-Type": "application/json",
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    patients.push(data);
    console.log(patients);
    card();
  })
  .catch((error) => console.error("Error:", error));

const list = document.querySelector('#list');

function card(){
  let kod = '';
  kod = patients[0].map((item, index) => {
    return `<div onclick="personalInfo(${index})" class="flex items-center justify-between py-[10px] px-[20px] cursor-pointer hover:bg-[#01F0D0]">
                <div class="flex gap-[15px] items-center">
                    <img class="w-[48px] h-[48px] align-middle" src="${item.profile_picture}" alt="">
                    <div>
                        <p class="text-[#072635] font-bold text-[14px]">${item.name}</p>
                        <p class="whitespace-nowrap text-[#707070] font-normal text-[15px]"> ${item.gender}, ${item.age}</p>
                    </div>
                </div>
                <i class="fa-solid fa-ellipsis text-[20px]"></i>
            </div>`;
  }).join('');
  list.innerHTML += kod;

  lab.innerHTML = patients[0][0].lab_results.map(item => {
    return ` <li class="flex justify-between text-[#072635] my-[15px]"><p class="text-[18px] font-medium">${item}</p> <img src="img/download_FILL0_wght300_GRAD0_opsz24 (1).svg" alt=""></li>`;
  }).join('');

  diagnostic.innerHTML = patients[0][0].diagnostic_list.map(item => {
    return `<div class="flex justify-between px-[16px] my-[10px] border-b-[#333] rounded-[24px] py-[15px] text-[#072635] font-normal text-[14px]">
        <p class="text-left">${item.name}</p>
        <p class="text-center">${item.description}</p>
        <p class="text-right">${item.status}</p>
    </div>
    <hr />`;
  }).join('');
}

function personalInfo(arg) {
  const person = document.querySelector('#person');
  const lab = document.querySelector('#lab');
  const diagnostic = document.querySelector('#diagnostic');
  const heart = document.querySelector('#heart');
  const temperature = document.querySelector('#temperature');
  const rate = document.querySelector('#rate');
  const firstValue = document.querySelector('#firstValue');
  const secondValue = document.querySelector('#secondValue');

  person.innerHTML = '';
  let filteredItems = patients[0].filter((item, index) => index == arg);
  let patient = filteredItems[0];
  let kod = `
      <div>
          <img class="w-[200px] mx-auto my-[10px]" src="${patient.profile_picture}" alt="">
          <p class="text-center text-[#072635] font-bold text-[24px] font-[Arial]">${patient.name}</p>
      </div>
      <ul class="my-[25px] flex flex-col gap-[15px]">
          <li class="flex gap-[15px] items-center">
              <img class="w-[50px] h-[50px]" src="img/BirthIcon.png" alt="">
              <div>
                  <p class="text-[#072635] font-normal text-[18px]">Date Of Birth</p>
                  <p class="text-[#072635] font-semibold text-[16px]">${patient.date_of_birth}</p>
              </div>
          </li>
          <li class="flex gap-[15px] items-center">
              <img class="w-[50px] h-[50px]" src="img/FemaleIcon.svg" alt="">
              <div>
                  <p class="text-[#072635] font-normal text-[18px]">Gender</p>
                  <p class="text-[#072635] font-semibold text-[16px]">${patient.gender}</p>
              </div>
          </li>
          <li class="flex gap-[15px] items-center">
              <img class="w-[50px] h-[50px]" src="img/PhoneIcon.svg" alt="">
              <div>
                  <p class="text-[#072635] font-normal text-[18px]">Contact Info</p>
                  <p class="text-[#072635] font-semibold text-[16px]">${patient.phone_number}</p>
              </div>
          </li>
          <li class="flex gap-[15px] items-center">
              <img class="w-[50px] h-[50px]" src="img/PhoneIcon.svg" alt="">
              <div>
                  <p class="text-[#072635] font-normal text-[18px]">Emergency Contacts</p>
                  <p class="text-[#072635] font-semibold text-[16px]">${patient.emergency_contact}</p>
              </div>
          </li>
          <li class="flex gap-[15px] items-center">
              <img class="w-[50px] h-[50px]" src="img/InsuranceIcon.svg" alt="">
              <div>
                  <p class="text-[#072635] font-normal text-[18px]">Insurance Provider</p>
                  <p class="text-[#072635] font-semibold text-[16px]">${patient.insurance_type}</p>
              </div>
          </li>
      </ul>
      <div class="flex justify-center my-[15px]">
          <button class="text-center text-[#072635] bg-[#01F0D0] rounded-[41px] py-[11px] px-[40px]">Show All Information</button>
      </div>
  `;
  person.innerHTML = kod;

  lab.innerHTML = patient.lab_results.map(item => {
    return ` <li class="flex justify-between text-[#072635] my-[15px]"><p class="text-[18px] font-medium">${item}</p> <img src="img/download_FILL0_wght300_GRAD0_opsz24 (1).svg" alt=""></li>`;
  }).join('');
  diagnostic.innerHTML = patient.diagnostic_list.map(item => {
    return `<div class="flex justify-between px-[16px] my-[10px] border-b-[#333] rounded-[24px] py-[15px] text-[#072635] font-normal text-[14px]">
        <p class="text-left">${item.name}</p>
        <p class="text-center">${item.description}</p>
        <p class="text-right">${item.status}</p>
    </div>
    <hr />`;
  }).join('');

  let sum = 0;
  let sums = 0;
  let sumt = 0;
  let suml = 0;
  let sumls = 0;
  let heartRate = patient.diagnosis_history.map(item => item.heart_rate.value);
  heartRate.forEach(element => {
    sum += element;
  });
  sum = sum / heartRate.length;
  heart.innerHTML = sum.toFixed(0) + ' bpm';

  let temperaturee = patient.diagnosis_history.map(item => item.temperature.value);
  temperaturee.forEach(element => {
    sums += element;
  });
  sums = sums / temperaturee.length;
  temperature.innerHTML = sums.toFixed(1) + '°F';

  let respiratoryRate = patient.diagnosis_history.map(item => item.respiratory_rate.value);
  respiratoryRate.forEach(element => {
    sumt += element;
  });
  sumt = sumt / respiratoryRate.length;
  rate.innerHTML = Math.round(sumt) + ' bpm';
    diastolicValue =  patient.diagnosis_history.map(item => item.blood_pressure.diastolic.value);
    systolicValue =  patient.diagnosis_history.map(item => item.blood_pressure.systolic.value);
  myChart.data.datasets[0].data = diastolicValue;
  myChart.data.datasets[1].data = systolicValue;
  myChart.update();

  let diastolic =  patient.diagnosis_history.map(item => item.blood_pressure.diastolic.value);
  let systolic =  patient.diagnosis_history.map(item => item.blood_pressure.systolic.value);
  diastolic.forEach(element => {
        suml += element
  });
  systolic.forEach(element => {
        sumls += element
  });
  firstValue.innerHTML = (suml / patient.diagnosis_history.length).toFixed(0);
  secondValue.innerHTML = (sumls / patient.diagnosis_history.length).toFixed(0);
}
document.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('myChart').getContext('2d');
  myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Oct, 2023', 'Nov, 2023', 'Dec, 2023', 'Jan, 2024', 'Feb, 2024', 'Mar, 2024'],
      datasets: [
        {
          label: 'Heart Rate',
          data: [95, 120, 77, 92, 95, 80, 68, 70, 95], // Default initial data for heart rate
          borderWidth: 4,
          borderColor: '#7E6CAB',
          pointRadius: 10,
          pointBackgroundColor: '#E66FD2',
          pointBorderWidth: 1,
          pointBorderColor: '#fff',
          tension: 0.5
        },
        {
          label: 'Temperature',
          data: [ 163, 151, 168, 158, 117, 115, 133, 149, 165], // Default initial data for temperature
          borderWidth: 4,
          borderColor: '#C26EB4',
          pointRadius: 10,
          pointBackgroundColor: '#8C6FE6',
          pointBorderWidth: 1,
          pointBorderColor: '#fff',
          tension: 0.5
        }
      ]
    },
    options: {
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          beginAtZero: false,
          grid: {
            display: false
          }
        }
      }
    }
  });
});
