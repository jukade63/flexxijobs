export default function calculateCompletenessRate(data: any) {
    const { user, education, experiences, skills } = data;
    const userWeight = 0.5; 
    const sectionsWeight = 0.5; 

    const userCompletenessRate = user ? userWeight * 100 : 0;

    let totalRequiredSections = 3; // Total number of required sections excluding user
    let totalFilledSections = 0;

    if (education && education.length > 0) totalFilledSections++;
    if (experiences && experiences.length > 0) totalFilledSections++;
    if (skills && skills.length > 0) totalFilledSections++;

    const sectionsCompletenessRate = totalFilledSections / totalRequiredSections * sectionsWeight * 100;

    const completenessRate = userCompletenessRate + sectionsCompletenessRate;

    return completenessRate;
}
