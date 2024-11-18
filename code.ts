const body = {
			public_key: public_key,
			amount: discountedPrice,
			currency: "AZN",
			description: "Event Payment",
			language: "az",
			order_id: createdId.toString(),
			// success_redirect_url: `${process.env.HOST}/order/success`,
			// error_redirect_url: `${process.env.HOST}/order/fail`,
			// result_url: `${process.env.HOST}/order/result`,
		}

		const data_string = JSON.stringify(body);
		const base64data = Buffer.from(data_string).toString('base64');

		const sgn_string = crypto.createHash('sha1')
				.update(private_key + base64data + private_key)
				.digest('binary');
		const signature = Buffer.from(sgn_string).toString('base64');

		const post_data = {
			data: base64data,
			signature: signature,
		}
		console.log("Epoint post data in create order", post_data)
		const res = await fetch('https://epoint.az/api/1/request', {
			method: 'POST',
			headers: {
				// "Content-Type": "application/x-www-form-urlencoded"
				"Content-Type": "application/json"
			},
			// body: new URLSearchParams(post_data).toString(),
			body: JSON.stringify(post_data),
		})
		const data = await res.json();
		console.log("Epoint data in create order", data); //Burada { status: 'error', message: 'Signature did not match' } verir
