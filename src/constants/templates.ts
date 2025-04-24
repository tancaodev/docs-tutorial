export const templates = [
    {
        id: 'blank',
        label: 'Blank Document',
        imageUrl: '/blank-document.svg',
        initialContent: ''
    },
    {
        id: 'software-proposal',
        label: 'Software development proposal',
        imageUrl: '/software-proposal.svg',
        initialContent: `
            <h1>Software Development Proposal</h1>
            <h2>Project Overview</h2>
            <p>Brief description of the project...</p>
            
            <h2>Objectives</h2>
            <ul>
                <li>Objective 1</li>
                <li>Objective 2</li>
                <li>Objective 3</li>
            </ul>
            
            <h2>Technical Requirements</h2>
            <p>List of technical requirements...</p>
            
            <h2>Timeline</h2>
            <p>Project timeline and milestones...</p>
            
            <h2>Budget</h2>
            <p>Budget breakdown...</p>
        `
    },
    {
        id: 'project-proposal',
        label: 'Project proposal',
        imageUrl: '/project-proposal.svg',
        initialContent: `
            <h1>Project Proposal</h1>
            <h2>Executive Summary</h2>
            <p>Brief summary of the project...</p>
            
            <h2>Background</h2>
            <p>Project background and context...</p>
            
            <h2>Project Goals</h2>
            <ul>
                <li>Goal 1</li>
                <li>Goal 2</li>
                <li>Goal 3</li>
            </ul>
            
            <h2>Methodology</h2>
            <p>Approach and methodology...</p>
            
            <h2>Deliverables</h2>
            <p>List of project deliverables...</p>
        `
    },
    {
        id: 'business-letter',
        label: 'Business letter',
        imageUrl: '/business-letter.svg',
        initialContent: `
            <div style="text-align: right;">
                <p>[Your Company Name]</p>
                <p>[Your Address]</p>
                <p>[City, State, ZIP]</p>
                <p>[Date]</p>
            </div>
            
            <p>[Recipient's Name]</p>
            <p>[Recipient's Company]</p>
            <p>[Recipient's Address]</p>
            <p>[City, State, ZIP]</p>
            
            <p>Dear [Recipient's Name],</p>
            
            <p>I am writing to you regarding...</p>
            
            <p>Sincerely,</p>
            <p>[Your Name]</p>
            <p>[Your Position]</p>
        `
    },
    {
        id: 'resume',
        label: 'Resume',
        imageUrl: '/resume.svg',
        initialContent: `
            <h1>[Your Name]</h1>
            <p>[Your Contact Information]</p>
            <p>[Email] | [Phone] | [LinkedIn]</p>
            
            <h2>Professional Summary</h2>
            <p>Brief professional summary...</p>
            
            <h2>Work Experience</h2>
            <h3>[Job Title]</h3>
            <p>[Company Name] | [Dates]</p>
            <ul>
                <li>Achievement 1</li>
                <li>Achievement 2</li>
                <li>Achievement 3</li>
            </ul>
            
            <h2>Education</h2>
            <p>[Degree]</p>
            <p>[University Name] | [Graduation Year]</p>
            
            <h2>Skills</h2>
            <ul>
                <li>Skill 1</li>
                <li>Skill 2</li>
                <li>Skill 3</li>
            </ul>
        `
    },
    {
        id: 'cover-letter',
        label: 'Cover letter',
        imageUrl: '/cover-letter.svg',
        initialContent: `
            <div style="text-align: right;">
                <p>[Your Name]</p>
                <p>[Your Address]</p>
                <p>[City, State, ZIP]</p>
                <p>[Email] | [Phone]</p>
                <p>[Date]</p>
            </div>
            
            <p>[Hiring Manager's Name]</p>
            <p>[Company Name]</p>
            <p>[Company Address]</p>
            
            <p>Dear [Hiring Manager's Name],</p>
            
            <p>I am writing to express my interest in the [Position Name] position at [Company Name].</p>
            
            <p>In my current role at [Current Company], I have developed skills in...</p>
            
            <p>I am particularly drawn to [Company Name] because...</p>
            
            <p>I would welcome the opportunity to discuss how my skills and experience align with your needs.</p>
            
            <p>Sincerely,</p>
            <p>[Your Name]</p>
        `
    },
    {
        id: 'letter',
        label: 'Letter',
        imageUrl: '/letter.svg',
        initialContent: `
            <div style="text-align: right;">
                <p>[Your Name]</p>
                <p>[Your Address]</p>
                <p>[City, State, ZIP]</p>
                <p>[Date]</p>
            </div>
            
            <p>[Recipient's Name]</p>
            <p>[Recipient's Address]</p>
            <p>[City, State, ZIP]</p>
            
            <p>Dear [Recipient's Name],</p>
            
            <p>I hope this letter finds you well.</p>
            
            <p>[Main content of your letter...]</p>
            
            <p>Sincerely,</p>
            <p>[Your Name]</p>
        `
    }
]
