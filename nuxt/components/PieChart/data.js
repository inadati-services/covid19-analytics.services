export default ({ patient, sickbed_total }) => {
    let re
    if (patient > sickbed_total) {
        re = [{
            name: `患者数: ${patient}\n
            病床不足: ${sickbed_total - patient}\n
            ${Math.round((patient / sickbed_total * 100) * 100) / 100}%`,
            value: patient
        }, {
            name: `空き病床: ${sickbed_total - patient}\n${Math.round(((sickbed_total - patient) / sickbed_total * 100) * 100) / 100}%`,
            value: sickbed_total - patient
        }]
    } else if (patient == sickbed_total) {
        re = [{
            name: `患者数: ${patient}\n${Math.round((patient / sickbed_total * 100) * 100) / 100}%
    `,
            value: patient
        }]
    } else {
        re = [{
            name: `患者数: ${patient}\n${Math.round((patient / sickbed_total * 100) * 100) / 100}%
    `,
            value: patient
        }, {
            name: `空き病床: ${sickbed_total - patient}\n${Math.round(((sickbed_total - patient) / sickbed_total * 100) * 100) / 100}%`,
            value: sickbed_total - patient
        }]
    }
    return re
}