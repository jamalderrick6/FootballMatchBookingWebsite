const headers = [
	'African Uniqueness',
	'Watch the exciting teams in the country',
	"Don't be late",
];

const paragraphs = [
	'Never seen football like this. Experience the football madness or crazy moments',
	'Get your hands with awosome Teams and Matches in the Kenya Premier League™!',
	'Avoid huge queues to book a chance to watch live. We make it convenient for you',
];

const images = [
	"https://lh3.googleusercontent.com/C2RNidlH2WQTarHSA47L2WpKOVBzCNb2sZkMc_vBb3ZKih8bmXX6ixy-wXRyBrAcO9RtgNzoUtj0q3xj8PJi1NfMI-B-sw=s1000", 
	"https://newsmedia.tasnimnews.com/Tasnim/Uploaded/Image/1401/12/24/1401122419264145127246504.jpg", 
	"https://images.sportsbrief.com/images/1120/753cbc2b8b9920a3.jpeg?v=1"
];

const Testmonials = () => {
	return (
		<section id="about">
			{headers.map((_, i) => (
				<section>
					<div className="container p-5">
						<div className="row gx-5 align-items-center">
							<div className={`col-lg-6  ${i % 2 !== 0 && 'order-lg-2'}`}>
								<div className="px-5 py-3">
									<h2 className="display-6 fw-bold text-primary">
										{headers[i]}
									</h2>
									<p className="fw-bold">{paragraphs[i]}</p>
								</div>
							</div>
							<div className={`col-lg-6  ${i % 2 !== 0 && 'order-lg-1'}`}>
								<div className="px-5 py-3">
									<img
										className="img-fluid rounded-5"
										src={images[i]}
										alt="..."
									/>
								</div>
							</div>
						</div>
					</div>
				</section>
			))}
		</section>
	);
};

export default Testmonials;
